const express = require('express');
const route = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');

route.get('/login', async(req,res)=>{
    try {
        let user = await userModel.aggregate([{$match:{}}])
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
        let userdata = await userModel.findOne({ email })
        console.log(userdata)
        if (userdata) {
            
           let result = await bcrypt.compare(password, userdata.password);
           console.log('BIRICPT RESULT', result)
           if(result){
            //token
            const token = jwt.sign({
                exp: Math.floor(Date.now()/1000)+ 60*60,
                data : userdata._id,
            },process.env.jwtSerectKey);
            console.log('TOKEN GENARATED ', token)
            res.json({
                status:"sucesess",
                token
            })
           }else{
            res.status(400).json({
                status:'password not matched',
            })
           }
        }else{
            res.status(400).json({
                status:'user not register/ register brfore login',
            })
        }             
    } catch (error) {
        return res.status(500).json({errr: error.messege})
    }
})


// route.post('/login', async (req,res)=>{
//     try {
//         const {email , password} = req.body;        
//         let user = await userModel.find({email})
//         if(!user){
//             return res.status(400).json({status:"user doesnot exist. regster please"})
//         }
//         bcrypt.compare(password, user.password, (err,result)=>{
//             if(err){
//                 return res.status(500).json({messege: err.message})
//             }
//             if(result){
//                 const token = jwt.sign({data:user._id},process.env.jwtSerectKey,{expiresIn:"5h"} )
//                 res.json({
//                     email,
//                     status: "login Sucessfull",
//                     token
//                 })
//             }
//         })               
//     } catch (error) {
//         return res.status(500).json({errr: error.messege})
//     }
// })



module.exports = route;