const jwt = require('jsonwebtoken');
let sirectKey = process.env.jwtSerectKey 

const tokenVarification = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, sirectKey, (err, decode)=>{
            if(err){
                return res.status(403).json({
                    status:'filed/ login againn'
                  })
            }
            req.userID = decode.data
            next()
        })
    }else{
        res.json({
            status:'failed!',
            messge: "token missing!!!"
        })
    }
}

module.exports = tokenVarification;