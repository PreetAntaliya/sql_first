const express = require('express')
const routes = express.Router()
const homeController = require('../controller/homeController')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('profile_pic')

routes.get('/home', homeController.home )
routes.get('/deleteUser', homeController.deleteUser )
routes.post('/addUser',upload, homeController.adduser )
routes.get('/updateUser', homeController.editPage )
routes.post('/update',upload, homeController.updateUser )

module.exports = routes