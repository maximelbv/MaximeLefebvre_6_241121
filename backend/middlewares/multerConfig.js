
import multer from 'multer';

// media types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Multer configuration
// the multer.diskStorage function take an object with two elements: the destination and the file name, which are generated via functions
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // null means that there is no errors
    // 'images' is the name of the destination directory
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // assign the file name to a const, avoid whitespaces with split() and join()
    const name = file.originalname.split(' ').join('_');
    // define the file extension
    const extension = MIME_TYPES[file.mimetype];
    // return the final name of the file, Date.now is added to make the name unique
    callback(null, name + Date.now() + '.' + extension);
  }
});

export default multer({storage: storage}).single('image');