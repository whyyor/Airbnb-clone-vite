const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserModel = require('./models/User')
require('dotenv').config()
const app = express()

const bcryptSalt = bcrypt.genSalt(12)

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

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(userDoc)
})

app.listen(4000)
