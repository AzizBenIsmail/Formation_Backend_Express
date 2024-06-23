const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const maxAge = 2 * 60 * 60 //2H

const createToken = (id) =>{
    return jwt.sign({id},'net 3Click secret',{expiresIn: maxAge})
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJpZCI6IjY2Njc1YzE4YzY5NmNjNGZkMGZiMWJkNiIsImlhdCI6MTcxODEzNTk5MywiZXhwIjoxNzE4MTQzMTkzfQ
//.xH69EHUeSny3WZfkxWj9VjPdfQL1oTDYV0I1GzjmzhY

const createToResetPwd = (id) =>{
    return jwt.sign({id, expiresIn: Math.floor(date.now() / 1000)},"net 3Click secret");
}


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
        const { firstName ,lastName, age ,email, password } = req.body;

        //const {age} = req.body.age;
        //const {email} = req.body.email;
        //const {password} = req.body.password;
        console.log(req.body);
        const user = new userModel({firstName, age ,lastName, email, password});
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
        const user = await userModel.findById(id).populate("cars"); 

        if(!user)
            {
                throw new Error ("User not found")
            }

      res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; //get d id from params
        const { firstName , lastName , age , email  } = req.body;
        console.log(req.body);
        const checkIfUserExists = await userModel.findById(id)

        if(!checkIfUserExists)
            {
                throw new Error("uesr not found !")
            }


            updatedUser = await userModel.findByIdAndUpdate(id,{
            $set : {firstName , lastName , age, email},
        })        

        res.status(200).json({updatedUser})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.addUserWithImage = async (req, res) => {
    try {
        const { firstName , lastName , email, password } = req.body;
        const {filename} = req.file;
        console.log(filename);
        const user = new userModel({firstName , lastName, email, password , user_image : filename });
        const addedusers = await user.save();

        res.status(200).json({addedusers})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports.getSortedUsersByAge = async (req, res) => {
try {
    const userList = await userModel.find().sort({age : -1}) //-1
    
    res.status(200).json({userList})
} catch (error) {
    res.status(500).json({message:error.message});
}

}

module.exports.getUsers18 = async (req, res) => {
    try {
        const userList = await userModel.find({ age: {$gt: 18} }) //-1
        
        res.status(200).json({userList})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
    }
    

    module.exports.getUsersByAge = async (req, res) => { // /18 => /:id
        try {
            const {age}  = req.params;
            const ageInt = parseInt(req.params.age)

            //const age  = req.params.age;
            // console.log('lola ma mamchetcch',req.params); // age -> 
            // console.log('theniya mchet ',req.params.age);  //age ->
            console.log(age); 
            const userList = await userModel.find({ age: {$lt: age} }) //-1
            
            res.status(200).json({userList})
        } catch (error) {
            res.status(500).json({message:error.message});
        }
        
        }
        

module.exports.getUserBetweenXAndY = async (req, res) => { //?minAge=18&maxAge=28
 try {
    //const id = req.params.id
        //const {id} = req.params

    //parseInt(id, 10)

    // const minAge = parseInt(req.query.minAge,10);
    // const maxAge = parseInt(req.query.maxAge,10);

    const maxAge= req.body.maxAge
    const minAge = req.body.minAge
    console.log(req.body)
    if(isNaN(minAge) || isNaN(maxAge)){
        //res.status(400).json("maxAge null")
        throw new Error ("maxAge null")
    }

    if(minAge > maxAge){
        //res.status(400).json("maxAge null")
        throw new Error ("maxAge < minAge")
    }
    console.log(req);
    const userList = await userModel.find({ age: {$gt : minAge , $lt:maxAge} }).sort({ age : 1 }) //-1

    res.status(200).json({userList})
 } catch (error) {
    res.status(500).json({message:error.message});
 }
    
};

module.exports.searchUsersByName = async (req, res) => { // ?name=John
    try {
        
        const {name} = req.query;

        if(!name) {
        throw new Error ("Please select a name")
        }

        const userList = await userModel.find({
            firstName: {$regex : name , $options: "i" } // Debut
            //firstName: {$regex : `${name}$` , $options: "i" } Fin

        })

        if(userList.length === 0) {
        throw new Error ("Aucune Utilisateur trouve pour ce nom")
        }

        res.status(200).json({userList})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports.login = async (req, res) =>{
    try {
        const { email , password } = req.body
        const user = await userModel.login(email, password)
        await userModel.findByIdAndUpdate(
            {_id: user._id},
            {statu: true}
        )
        const token = createToken(user._id);
        console.log(token)
        res.cookie('jwt_token',token, {httpOnly: false,maxAge: maxAge * 1000})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports.logout = async (req, res) =>{
    try {
        const id =  req.session.user._id;
        await userModel.findById(id)
        await userModel.findByIdAndUpdate(
            {_id: id},
            {statu: false}
        )
        res.cookie('jwt_token','',{httpOnly: false,maxAge: 1});
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}