const express = require('express')
const router = express.Router()
const designRoute = require('./designRoute')
const userRoute = require('./userRoute')
const categoryRoute = require('./categoryRoute')
const bookmarkRoute = require('./bookmarkRoute')

router.use('/user', userRoute)
router.use('/categories', categoryRoute)
router.use('/bookmark', bookmarkRoute)
router.use('/', designRoute)

module.exports = router