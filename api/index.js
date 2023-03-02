const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(express.json())
//this will help us parse json so that we can access variables

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
)

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  res.json({ name, email, password })
})

app.listen(4000)
