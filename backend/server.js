const express= require("express")
const path= require("path")
const errorHandle = require("./middleware/errorMiddleware")
const colors= require("colors")
const bcrypt= require("bcryptjs")
const connectionDb= require("./config/mongoDb")
const dotenv= require("dotenv").config()
const app= express()
let PORT= process.env.PORT || 5000;
connectionDb()

// get req data api as json
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/api/users', require("./router/userRouter"))
app.use('/api/tickets', require("./router/ticketRoute"))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>{
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  })
}else{
  app.get('/', (req, res) =>{
    res.json({message: "Hello World"})
  })
}

app.use(errorHandle)

app.listen(PORT, () =>{
  console.log(`Server is listening on port ${PORT}`)
})