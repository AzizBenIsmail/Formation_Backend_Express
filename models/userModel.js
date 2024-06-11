const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : String ,
    lastName : String ,
    age : Number,
    email : 
    {
        type : String,
        required : false,
        unique : false,
        lowercase : false,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type : String,
        required : true,
        minLength :6,
    },
    roles : {
        type : String,
        enum : ['admin', 'manager','client'],
    },
    user_image : { type : String, required : false , default : 'client.png'},

    statu : String
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    
},{timestamps: true});

userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});


userSchema.pre('save', async function (next) {
    try {
      //cryptage password + statu + createdAt et updatedAt
      const salt = await bcrypt.genSalt()
      const User = this
      User.password = await bcrypt.hash(User.password, salt)
      User.createdAt = new Date()
      User.updatedAt = new Date()  
      next()
    } catch (error) {
      next(error)
    }
  })
  

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email}) 
  if (user){
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw new Error("invalid password")
  }
  throw new Error("incorrect email")
}
  
const User = mongoose.model("User", userSchema);

module.exports = User;