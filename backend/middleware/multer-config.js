const multer = require('multer');


//--------------------
// Constante autaurisant seulement certains type de format d'image
//--------------------
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


//--------------------
// Stockage des images et suppression automatique dans la BDD MongoDB 
//--------------------
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    //--------------------
    // Tranforme les espace en underscore 
    //--------------------
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //--------------------
    // Suivis de la date actuel separé par un point
    //--------------------
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');