const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const slotController = require('../controllers/slotController')
const bookingController =require('../controllers/bookingController')
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/cowincenter', userController.getByPin)
router.get('/solt', slotController.slotsToBook )
router.get('/booking', bookingController.bookingHandler)



module.exports = router
