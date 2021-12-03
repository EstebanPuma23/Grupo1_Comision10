const path = require('path');
const multer = require('multer');

/* configuración de multer */
const storage = multer.diskStorage({
    destination : (req,file,callaback) => {
        callaback(null,'./public/images/')
    },
    filename : (req,file,callaback) => {
        callaback(null,'profile_picture-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

module.exports = upload;