import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
<<<<<<< HEAD
    destination: function (req, file, cb) {
        cb(null, './public/');
=======
    destination : function(req, file, cb){
        cb(null, "./public/");
>>>>>>> 17658fab1bf05dd6938a62e107c88e3ae4bdddc3
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ 
    storage, 
    limits: { fileSize: 50 * 1024 * 1024 } // Optional: Set max file size (50MB here)
});