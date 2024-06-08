var express = require('express');
var router = express.Router();
const userController = require('../Controller/userController');
/* GET users listing. */
//Get pour afficher //ADD => Post //DELETE => suppression //put modification
router.get('/getAllUsers', userController.getUsers );  
router.get('/getAllUsers/:id', userController.getUsersById );  
router.post('/addUser', userController.addUser); 
router.post('/addUserWithImage', userController.addUserWithImage); 
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
module.exports = router;
