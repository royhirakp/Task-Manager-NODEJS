const express = require('express')
const cros = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cros())

//route
const userR = require('./routes/userRoute')
const TaskR = require('./routes/TaskRoute')
const Auth = require('./Auth/Auth')
app.use('/task',Auth)
app.use(userR)
app.use(TaskR)
app.get('/',(req,res)=>{
    // console.log('router working')
    res.send({w: 'working'})
})

module.exports = app