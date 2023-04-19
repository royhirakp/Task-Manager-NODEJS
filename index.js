// console.log('weee')
require('dotenv').config();
let mongoose = require('mongoose')
const app = require('./app')
let port = 3002;
let mongourl= process.env.mongo

mongoose.connect(mongourl).then(()=>{console.log('DB connected')})
app.listen(port, () => { console.log(`Server is up at ${port} `) })

