const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})
const imageKit = require('../middlewares/imagekit')
const { authentication, addDesignAuthorization, editDeleteDesignAuthorization } = require('../middlewares/auth')
const designController = require('../controller/designController')

router.get('/', designController.findAll)
router.get('/:id', designController.findSelected)
router.use(authentication)
router.post('/', upload.array('DesignImage', 3), imageKit, addDesignAuthorization, designController.addDesign)
router.use('/:id', editDeleteDesignAuthorization)
router.delete('/:id', designController.deleteDesign)
router.put('/:id', upload.array('DesignImage', 3), imageKit, designController.editDesign)

module.exports = router