const express = require('express')
const router = express.Router();
const TaskModel = require('../models/TaskModel');

router.get('/task', async (req,res)=>{
  try {
    console.log( req.userID)
    const data = await TaskModel.aggregate([{$match:{}}])
    res.status(200).json({data})    
  } catch (error) {
        res.status(500).json({
        status:"error",
        messege: error.messege
        })
  }
})

router.post('/task', async (req,res)=>{

    try {
        const {title, description} = req.body
      await TaskModel.create({
        title: title,
        description: description,
        user: req.userID
      })  
      res.json({status:'created'})
    } catch (error) {
          res.status(500).json({
          status:"error",
          messege: error.messege
          })
    }
  })

  router.delete('/task/:id', async (req,res)=>{

    try {
        let data = await TaskModel.deleteOne({_id: req.params.id})
        // console.log(data.deletedCount ===0)
        if(data.deletedCount ===0){
            return res.status(404).json({status:"no data"})
        }
        
      res.status(204).json()
    } catch (error) {
          res.status(500).json({
          status:"error",
          messege: error.messege
          })
    }
  })

  router.put('/task/:id', async (req,res)=>{

    try {
        const {title, description} = req.body
        if(!title && !description){
            return res.status(400).json({
                messege:"req body is empty "
            })
        }
        let data = await TaskModel.updateOne({_id:req.params.id},{
            $set:{
                title: title,
                description: description,
            }
        })
        console.log(data)

        if(data.matchedCount ===0){
            return res.status(404).json({
                eror:'no data'
            })
        }
        res.status(204).json()      
      
    } catch (error) {
          res.status(500).json({
          status:"error",
          messege: error.messege
          })
    }
  })


module.exports = router;