var express = require('express');
var router = express.Router();
const userController = require('../Controller/userController');
const uploadfile = require('../middlewares/uploadfile');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
/* GET users listing. */
//Get pour afficher //ADD => Post //DELETE => suppression //put modification
router.get('/getAllUsers', userController.getUsers );  
router.get('/getUsersById/:id', userController.getUsersById );  
router.get('/getOrderAllUsersByAge',userController.getSortedUsersByAge);
router.get('/getUserBetweenXAndY',userController.getUserBetweenXAndY);
router.get('/getUsers18',userController.getUsers18)
router.get('/getUsersByAge/:age',userController.getUsersByAge)
router.get('/searchUsersByName',userController.searchUsersByName);
router.get('/login',userController.login);
router.get('/logout',userController.logout);
router.post('/addUser', userController.addUser); 
router.post('/addClient',uploadfile.single("image_user"), userController.addUserWithImage);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
module.exports = router;
