const express = require('express')
const bcrypt = require('bcrypt')
const  exjwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

const validatejwt = exjwt({ secret: "miSecretVictoria", algorithms: ["HS256"] })

const signToken = _id => jwt.sign({_id}, "miSecretVictoria")

const findAndAssignUser = async(req,res,next) =>{
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(401).end()
        }
        req.user = user
        next()
    }catch(e){
        next(e)
    }
}

const isAuthenticated = express.Router().use(validatejwt,findAndAssignUser)

const Auth = {
    login: async (req,res) =>{
        const { body } = req
        console.log(body)
        try{
            const user = await User.findOne({ email: body.email})
            if(!user){
                res.status(401).send('Usuario y/0 password invalido')
            }else{
                const isMatch = await bcrypt.compare(body.password,user.password)
                console.log(isMatch)
                if(isMatch){
                    const signed = signToken(user._id)
                    res.status(200).send(signed)
                }else{
                    res.status(401).send('Usuario y/0 password invalido')
                }
            }
        }catch(e){
            res.send(e.message)
        }
    },
    register:async(req,res) =>{
        const { body } = req
        try{
            const isUser = await User.findOne({ email: body.email})
            if(isUser){
                res.send('El usuario ya existe')
            }else{
                const salt = await bcrypt.genSalt()
                const hash = await bcrypt.hash(body.password, salt)
                const user = await User.create({
                    email: body.email, 
                    password: hash,
                    nombre: body.nombre,
                    numTel: body.numTel, 
                    salt
                })

                const signed = signToken(user._id)
                res.send(signed)
            }
        }catch(e){
            res.status(500).send(e.message)
        }
    },
}

module.exports = {Auth, isAuthenticated}