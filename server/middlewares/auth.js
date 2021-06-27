const { validateJWT } = require('../helpers/jwt')
const { User, Design } = require('../models')

function authentication(req, res, next){
    const access_token = req.headers.access_token

    if (access_token){
        try {
            const payload = validateJWT(access_token) //verifikasi token jwt
        
            User.findByPk(payload.id)
            .then((user) => {
                if (user){
                    req.user = { id: user.id, role: user.role, email: user.email }
                    next()
                }
                else {
                    // next({ code: 401, message: 'Invalid or wrong JWT' })
                    res.status(401).json({ message: 'Invalid or wrong JWT' })
                }
            })
            .catch((err) => {
                // next({ code: 500, message: err.message })
                res.status(401).json({ message: err.message })
            })
        }
        catch(err) {
            // next({ code: 401, message: 'Invalid or wrong JWT' })
            res.status(401).json({ message: 'Invalid or wrong JWT' })
        }
    }
    else {
        // next({ code: 401, message: 'Please login first' })
        res.status(401).json({ message: 'Please login first' })
    }
}

function addDesignAuthorization(req, res, next){
    if (req.user.role === 'Designer'){
        next()
    }
    else {
        // next({ code: 403, message: 'Forbidden Access' })
        res.status(403).json({ message: 'Forbidden Access' })
    }
}

function editDeleteDesignAuthorization(req, res, next){
    Design.findByPk(req.params.id)
    .then((result) => {
        if (result){
            if (req.user.role === 'Designer' && req.user.id === result.UsersId){
                next()
            }
            else {
                // next({ code: 403, message: 'Forbidden Access' })
                res.status(403).json({ message: 'Forbidden Access' })
            }
        }
        else {
            // next({ code: 404, message: 'Data not found' })
            res.status(404).json({ message: 'Data not found' })
        }
    })
    .catch(() => {
        // next({ code: 500, message: 'Internal server error' })
        res.status(500).json({ message: 'Internal server error' })
    })
}

function bookmarkAuthorization(req, res, next){
    if (req.user.role === 'Customer'){
        next()
    }
    else {
        // next({ code: 403, message: 'Forbidden Access' })
        res.status(403).json({ message: 'Forbidden Access' })
    }
}

module.exports = { authentication, addDesignAuthorization, editDeleteDesignAuthorization, bookmarkAuthorization }