const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/register/designer', userController.registerDesigner)
router.post('/register/customer', userController.registerCustomer)
router.post('/login', userController.login)

module.exports = router