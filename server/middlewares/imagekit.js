function imagekit(req, res, next){
    const axios = require('axios')
    const formData = require('form-data')

    req.files.forEach((element) => {
        if (!element){
            next()
        }
        else if (element.mimetype !== 'image/jpeg' && element.mimetype !== 'image/png'){
            next({ code: 400, message: 'You can only upload png or jpg' })
        }
        else {
            let api_key = Buffer.from(process.env.PRIVATE_KEY, 'utf8').toString("base64")
            const data = new formData()
            let pictures = []
            data.append('file', element.buffer.toString('base64'))
            data.append('fileName', element.originalname)
        
            axios({
                url: 'https://upload.imagekit.io/api/v1/files/upload',
                method: 'post',
                headers: {
                    Authorization: `Basic ${api_key}`,
                    ...data.getHeaders()
                },
                data: data
            })
            .then((result) => {
                pictures.push(result.data.url)
                console.log(pictures) //problem
                res.image = pictures
                next()
            })
            .catch((err) => {
                next({ code: 500, message: err.message })
            })
        } 
    });
}

module.exports = imagekit