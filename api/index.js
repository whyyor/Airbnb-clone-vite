const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
require('dotenv').config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'jfladksjfls'

app.use(express.json())
//this will help us parse json so that we can access variables
app.use(cookieParser())
//this will help us use cookies using req.cookies
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
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc)
  } catch (e) {
    res.status(422).json(e)
    //better error handling
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    //we compare our password with userDoc password
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(userDoc)
          //saves cookie to cookies which can be accessed using req.cookies
        },
      )
    } else {
      res.status(422).json('pass not ok')
    }
  } else {
    res.json('not found')
  }
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      //this return password too so we
      //destrucutre this before hand to execute password
      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
  //this empty string after token sets token to empty
  //which meeans our cookie is empty so we don't have user info
})

app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
   //once we have link we want to grab it and upload to uploads
  //we use library called image-downloader
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url:link,
    dest:__dirname+'/uploads/'+newName
    //{ __dirname: '/home/whyyor/Desktop/Airbnb-clone-vite/api' }
  })
  res.json(newName)
})

app.listen(4000)
