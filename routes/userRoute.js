const express = require('express');
const route = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');

route.get('/login', async(req,res)=>{
    try {
        let user = await userModel.aggregate([{$match:{}}])
        console.log(user)
        res.json(user)
    } catch (error) {
        res.json(error)
    }    
})
route.post('/singUp', async(req,res)=>{
    const {email, password} = req.body
    try {
        let user = await userModel.aggregate([{$match:{email:email}}])
        if(user.length){
            return res.status(403).json({
                status:"failed!! User Already exist"
            })              
        }else{ 
            bcrypt.hash(password,10, async(err,hash)=>{
                if(err){
                    return res.status(500).json({messege:err.messege})
                }
                // create user
                let data = await userModel.create({
                    email: email,
                    password : hash
                })
                return res.json({status:" user created"}) 
            })                    
        }        
    } catch (error) {
        res.status(500).json({error:error})
    }    
})

route.post('/login', async (req,res)=>{
    try {
        const {email , password} = req.body;        
        let user = await userModel.aggregate([{$match:{email:email}}])
        if(!user.length){
            console.log('iffffemail newiiif')
            return res.status(400).json({status:"user doesnot exist. regster please"})
        }
        bcrypt.compare(password, user[0].password, (err,result)=>{
            if(err){
                return res.status(500).json({messege: err.message})
            }
            if(result){
                const token = jwt.sign({data:user[0]._id},process.env.jwtSerectKey,{expiresIn:"5h"} )
                console.log(token)
                res.json({
                    email,
                    status: "login Sucessfull",
                    token
                })
            }
        })               
    } catch (error) {
        return res.status(500).json({errr: error.messege})
    }
})



module.exports = route;