const connectDB=require('./db');
const express = require('express')
let cors =require('cors')
const env=require('dotenv')
const path=require('path')

env.config()

connectDB();
const app = express()

const port = 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(path.resolve())
})


