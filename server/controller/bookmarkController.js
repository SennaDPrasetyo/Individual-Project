const { Bookmark, User, Design } = require('../models')

class Controller {
    static findAllBookmark(req, res){
        Bookmark.findAll({
            include: [User, Design],
            where: {
                UsersId: req.user.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    static addBookmark(req, res){
        const input = {
            DesignId: req.body.DesignId,
            UserId: req.user.id
        }

        Bookmark.create(input)
        .then(() => {
            res.status(201).json({
                message: 'Added to your wishlist', 
            })
        })
        .catch(() => {
            next({ code: 400, message: 'Bad requests' })
        })
    }
}

module.exports = Controller