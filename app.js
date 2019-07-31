const express = require('express')
const ejs = require('ejs')
const multer = require('multer')
const path = require('path')

const LH = 3000;

let app = express();

const port = process.env.PORT || LH;

//multer setting

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
}).single('profilepic')

//setup for ejs

app.set('view engine', 'ejs')

//static folder

app.use(express.static('./public'))

app.get('/', (req, res) => {

    res.render('index')

})

//route upload

app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render('index', {
                message: error

            })

        } else {

            res.render('index', {
                message: 'Upload success',
                filename: `myupload/${req.file.filename}`
            })

        }
    })
})


app.listen(port, () => {
    console.log('Sever is running at' + "-" + port)
})