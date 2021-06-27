const { Category } = require('../models')

class Controller {
    static findAllCategories(req, res){
        Category.findAll()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
}

module.exports = Controller