const CarModel = require("../models/carModel")
const UserModel = require("../models/userModel")

const getAllCars = async (req,res) => {
    try {
        const cars = await CarModel.find().populate("owner");
        
        res.status(200).json({cars})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCarById = async (req,res) => {
    try {
        const {id}  = req.params
        console.log(id)
        const car = await CarModel.findById(id).populate("owner");

        if (!car) {
            throw new Error("No such car")
        }

        res.status(200).json({car})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const addCar = async (req,res) => {
    try {
        const {brand, model , year} = req.body
        const car = new CarModel({
            brand, model , year
        })
        car.save()

        res.status(200).json({car})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addCarWithOwner = async (req,res) => {
    try {

        const {brand, model , year,UserId} = req.body
        

        const User = await UserModel.findById(UserId);
        if (!User) {
        throw new Error ("User not found")
        }

        const car = new CarModel({
            brand, model , year , owner : UserId
        })
        car.save()

        await UserModel.findByIdAndUpdate(UserId, {
           //  Car : car._id,            //simple 
             $push : { cars : car._id} //Tab
         })

        res.status(200).json({car})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCar = async (req,res) => {
    try {

        
        res.status(200).json({})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleterCar = async (req,res) => {
    try {

        const {id} = req.params

        const car = await CarModel.findByIdAndDelete(id)

        if(!car){
            throw new Error('undefine car')
        }
        
        await UserModel.updateMany({},{$pull : {cars : car.id}})

        
        res.status(200).json({})   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getCarById,addCar, updateCar,deleterCar,getAllCars,addCarWithOwner}