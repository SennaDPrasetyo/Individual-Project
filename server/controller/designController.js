const { Design, Category, User } = require('../models')

class Controller {
    static findAll(req, res){
        let { page, size } = req.query
        let filter = {}

        if (!page){
            page = 1
        }
        if (!size){
            size = 4
        }
        if (req.query.CategoriesId){
            filter.CategoriesId = +req.query.CategoriesId
        }

        const limit = parseInt(size)
        const offset = (page - 1) * size

        Design.findAndCountAll({
            include: [Category, User],
            limit,
            offset,
            where: filter
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        }) 
    }
    static findSelected(req, res){
        Design.findOne({
            include: [Category, User],
            where: {
                id: +req.params.id
            }
        })
        .then((result) => {
            if (result){
                res.status(200).json(result)
            }
            else {
                // next({ code: 404, message: 'Data not found' })
                res.status(404).json({ message: 'Data not found' })
            }
        })
        .catch((err) => {
            // next({ code: 500, message: err.message })
            res.status(500).json({ message: err.message })
        })
    }
    static addDesign(req, res){
        const input = {
            name: req.body.name,
            description: req.body.description,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            UsersId: req.user.id,
            CategoriesId: req.body.CategoriesId
        }

        Design.create(input)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError'){
                const errMsgs = []

                err.errors.forEach((element) => {
                    errMsgs.push(element.message)
                })
                // next({ code: 400, message: errMsgs })
                res.status(400).json({ message: errMsgs })
            }
            else {
                // next({ code: 500, message: err.message })
                res.status(500).json({ message: err.message })
            }
        })
    }
    static deleteDesign(req, res){
        Design.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then((result) => {
            if (result){
                res.status(200).json({ message: 'Delete Success' })
            }
            else {
                res.status(404).json({ message: 'Data not found' })
            }
        })
        .catch((err) => {
            // next({ code: 500, message: err.message })
            res.status(500).json({ message: err.message })
        })
    }
    static editDesign(req, res){
        const input = {
            name: req.body.name,
            description: req.body.description,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            UsersId: req.user.id,
            CategoriesId: req.body.CategoriesId
        }
        
        Design.update(input, {
            where: {
                id: +req.params.id
            }
        })
        .then(() => {
            res.status(200).json({ message: 'Design Updated' })
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError'){
                const errMsgs = []

                err.errors.forEach((element) => {
                    errMsgs.push(element.message)
                })
                // next({ code: 400, message: errMsgs })
                res.status(400).json({ message: errMsgs })
            }
            else {
                // next({ code: 500, message: err.message })
                res.status(500).json({ message: err.message })
            }
        })
    }
}

module.exports = Controller