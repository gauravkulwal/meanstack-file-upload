const express = require('express');
const router = express.Router();
const multer = require('multer');

const User = require('../model/user');
const objectId = require('mongoose').Types.ObjectId;
//multer 
const directory = './images/'

const storage = multer.diskStorage({
    destination: (req ,file , cb) => {
        cb(null , directory)
    },
    filename: (req , file ,cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null , filename)
    }
})
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
      }
    },
  })

  router.post('/user-add' ,upload.single('image') , (req , res) => {
    const url = req.protocol + '://'+ req.get('host');
  const user = new User({
        name: req.body.name,
        fatherName: req.body.fatherName,
        city: req.body.city,
        mobile: req.body.mobile,
        image: url+ '/images/'+ req.file.filename
    })
    user.save((err , docs) => {
if(err){
    res.send(err)
}else{
    res.send(docs)
}
    })
  })

router.get('/' ,(req, res) => {
  User.find((err , docs) => {
    if(err){
      res.send(err)
  }else{
      res.send(docs)
  }
  })
})  

router.get('/:id' ,(req , res) => {
if(!objectId.isValid(req.params.id)){
  res.send(`no record find with id ${req.params.id}`)
}else{
  User.findById(req.params.id , (err ,docs) => {
    if(err){
      res.send(err)
  }else{
      res.send(docs)
  }
  })
}
})


router.delete('/:id' ,(req , res) => {
  if(!objectId.isValid(req.params.id)){
    res.send(`no record find with id ${req.params.id}`)
  }else{
    User.findByIdAndRemove(req.params.id , (err ,docs) => {
      if(err){
        res.send(err)
    }else{
        res.send(docs)
    }
    })
  }
  })


  router.put('/update/:id' ,upload.single('image'),(req ,res) => {
    const url = req.protocol + '://' + req.get('host');
const user = {
  name: req.body.name,
  fatherName: req.body.fatherName,
  city: req.body.city,
  mobile: req.body.mobile,
  image: url+ '/images/'+ req.file.filename
}
User.findByIdAndUpdate(req.params.id , {$set: user} ,{new: true} , (err , docs) => {
  if(err){
    res.send(err)
}else{
    res.send(docs)
}
})

  })



  module.exports = router;