var express = require('express');
var router = express.Router();
const userController = require('../Controller/userController');
const uploadfile = require('../middlewares/uploadfile');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
/* GET users listing. */
//Get pour afficher //ADD => Post //DELETE => suppression //put modification
router.get('/getAllUsers',requireAuthUser, userController.getUsers );  
router.get('/getAllUsers/:id',requireAuthUser, userController.getUsersById );  
router.get('/getOrderAllUsersByAge',requireAuthUser,userController.getSortedUsersByAge);
router.get('/getUserBetweenXAndY',requireAuthUser,userController.getUserBetweenXAndY);
router.get('/getUsers18',requireAuthUser,userController.getUsers18)
router.get('/getUsersByAge/:age',requireAuthUser,userController.getUsersByAge)
router.get('/searchUsersByName',requireAuthUser,userController.searchUsersByName);
router.get('/login',userController.login);
router.get('/logout',requireAuthUser,userController.logout);
router.post('/addUser', userController.addUser); 
router.post('/addClient',uploadfile.single("image_user"), userController.addUserWithImage);
router.put('/updateUser/:id',requireAuthUser, userController.updateUser);
router.delete('/deleteUser/:id',requireAuthUser, userController.deleteUser);
module.exports = router;
