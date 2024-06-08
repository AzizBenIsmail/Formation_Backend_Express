var express = require('express');
var router = express.Router();
const userController = require('../Controller/userController');
/* GET users listing. */
//Get pour afficher //ADD => Post //DELETE => suppression //put modification
router.get('/getAllUsers', userController.getUsers );  
router.post('/addUser', userController.addUser); 
module.exports = router;
