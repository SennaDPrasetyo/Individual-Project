const express = require('express')
const router = express.Router()
const designRoute = require('./designRoute')
const userRoute = require('./userRoute')
const categoryRoute = require('./categoryRoute')

router.use('/', designRoute)
router.use('/user', userRoute)

module.exports = router