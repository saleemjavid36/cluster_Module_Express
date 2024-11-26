
import express from "express"
// const express= require('express')

const app = express()
const PORT = 8001;

app.get("/heavy",(req,res)=>{
    let total =0
    for (let i = 0; i < 50_000_000; i++) {
        total++
    }
    res.send(`The result of the CPU intensive task is ${total}\n`)
})

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
    console.log(`worker pid=${process.pid}`)
})