const express = require('express')
const router = express.Router()
const bookmarkController = require('../controller/bookmarkController')
const { authentication, bookmarkAuthorization } = require('../middlewares/auth')

router.get('/', authentication, bookmarkAuthorization, bookmarkController.findAllBookmark)
router.post('/', authentication, bookmarkAuthorization, bookmarkController.addBookmark)

module.exports = router