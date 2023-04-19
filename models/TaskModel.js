const { default: mongoose } = require('mongoose')
const mongosse = require('mongoose')

const TaskSchma = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type:  mongoose.Types.ObjectId, ref:"users"}
}) 

const taskModel = mongoose.model("Tasks", TaskSchma)

module.exports = taskModel