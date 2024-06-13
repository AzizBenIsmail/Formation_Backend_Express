const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand : String,
    color: { type: String , required: true , default:"#000000"},
    model: String,
    type: String,
    year: Number,
    owner : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} //one 
    
})

const Car = mongoose.model('Car',carSchema)

module.exports = Car