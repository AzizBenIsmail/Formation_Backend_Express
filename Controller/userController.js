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

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  //get d id from params /deleteUser/:id

        const checkIfUserExists = await userModel.findById(id); 
        // checkIfUserExists => User => defined => true => !true => false => mech bech yd5oel
        // checkIfUserExists => undefined => false => !false => true => yod5el ll if
        if(!checkIfUserExists){
            throw new Error ("User not Found !")
        }

        await userModel.findByIdAndDelete(id);
        

        res.status(200).json("deleted")
    } catch (error) {
       res.status(500).json({message : error.message}) 
    }

}

module.exports.getUsersById = async (req, res) => {
    try {
        const { id } = req.params; //get d id from params
        const user = await userModel.findById(id); 

        if(!user)
            {
                throw new Error ("User not found")
            }

      res.status(200).json({userList})
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; //get d id from params
        const { firstName , lastName , email } = req.body;
        console.log(req.body);
        const checkIfUserExists = await userModel.findById(id)

        if(!checkIfUserExists)
            {
                throw new Error("uesr not found !")
            }


            updatedUser = await userModel.findByIdAndUpdate(id,{
            $set : {firstName , lastName , email},
        })        

        res.status(200).json({updatedUser})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.addUserWithImage = async (req, res) => {
    try {
        const { firstName , lastName , email, password } = req.body;
        const {filename} = req.body;
        const user = new userModel({firstName , lastName, email, password , user_image : filename });
        const addedusers = await user.save();

        res.status(200).json({addedusers})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}