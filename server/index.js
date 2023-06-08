const connectDB=require('./db');
const express = require('express')
let cors =require('cors')
const env=require('dotenv-extended')
const path=require('path')

env.load()

connectDB();
const app = express()

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

/*****************PRODUCTION*******************/
const __dirname1 = path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname1,'/client/build')))
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname1,'client','build','index.html'))
    }
  )
}
else{
  app.get('/',(req,res)=>{
    res.send('API is not running')
  })
}
/*****************PRODUCTION*******************/

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})


