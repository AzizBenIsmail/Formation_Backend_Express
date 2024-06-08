const userModel = require('../models/userModel');

module.exports.getUsers = async (req, res) => {
    try {
        const userList = await userModel.find();

      res.status(200).json({userList})
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

module.exports.addUser = async (req, res) => {
    try {
        const { firstName , lastName , email, password } = req.body;

        const user = new userModel({firstName, lastName, email, password});
        const addedusers = await user.save();

        res.status(200).json({addedusers})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}