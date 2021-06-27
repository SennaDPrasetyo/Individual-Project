const express = require('express')
const router = express.Router()
const { authentication, addDesignAuthorization, editDeleteDesignAuthorization } = require('../middlewares/auth')
const designController = require('../controller/designController')

router.get('/', designController.findAll)
router.get('/:id', designController.findSelected)
router.use(authentication)
router.post('/', addDesignAuthorization, designController.addDesign)
router.use('/:id', editDeleteDesignAuthorization)
router.delete('/:id', designController.deleteDesign)
router.put('/:id', designController.editDesign)

module.exports = router