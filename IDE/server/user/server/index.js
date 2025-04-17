const express = require("express")
const app = express()

app.get("/",(req,res) => {
  res.json({
    message:"Welcome to DevTogether"
  })
})

app.get("/api",(req,res) => {
  res.json({
    message:"welcome to api"
  })
})

app.listen(3000,() =>{
  console.log("server listenning on port 3000")
})