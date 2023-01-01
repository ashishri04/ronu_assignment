const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const axios = require('axios')


const createUser = async function(req,res){
    try {
        let data = req.body
        let {name, phoneNumber, password, age, pincode, adhaarNumber} = data

        if(Object.keys(data).length==0){
            res.status(400).send({status:false, message:"All fields are mendatory"})
        }
        if(!name){
            res.status(400).send({status:false, message:"Name is mendatory"})
        }
        if(!/^[a-z A-Z ]+$/.test(name)){
            res.status(400).send({status:false, message:"Please provide valid Name"})
        }
        if(!phoneNumber){
            res.status(400).send({status:false, message:"PhoneNumber is mendatory"})
        }
        if(!/^[0]?[6789]\d{9}$/.test(phoneNumber)){
            res.status(400).send({status:false, message:"Please provide valid Phone Number"})
        }
        let checkPhone = await userModel.findOne({phoneNumber: phoneNumber})
        if(checkPhone){
            res.status(400).send({status:false, message:"Number is aleady used.. Please provide another phone number"})
        }
        if(!password){
            res.status(400).send({status:false, message:"Password is mendatory"})
        }
        if(!age){
            res.status(400).send({status:false, message:"Age is mendatory"})
        }
        if(!/^\S[0-9]{0,3}$/.test(age)){
            res.status(400).send({status:false, message:"Please provide valid Age"})
        }
        if(!pincode){
            res.status(400).send({status:false, message:"Pincode is mendatory"})
        }
        if(!/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode)){
            res.status(400).send({status:false, message:"Please provide valid Pincode"})
        }
        if(!adhaarNumber){
            res.status(400).send({status:false, message:"Adhaar Number is mendatory"})
        }
        if(!/^\d{4}\s\d{4}\s\d{4}$/.test(adhaarNumber)){
            res.status(400).send({status:false, message:"Please provide valid Adhaar Number"})
        }
        let checkAdhar = await userModel.findOne({adhaarNumber:adhaarNumber})
        if(checkAdhar){
            res.status(400).send({status:false, message:"Adhaar Number is aleady exist.. Please check your adhaar number"})
        }

        let userData = await userModel.create(data)
       res.status(201).send({status:true, message:"User created successfully", data:userData})
        
    } catch (error) {
        res.status(500).send({status:false, message: error.message})
    }
}

//====================================// login user //==========================================

const loginUser = async function(req,res){
    try {
        let data = req.body
        let {phoneNumber, password} = data

        if(Object.keys(data).length==0){
            res.status(400).send({status:false, message:"phone number and password are mendatory"})
        }
        if(!phoneNumber){
            res.status(400).send({status:false, message:"PhoneNumber is mendatory"})
        }
        if(!password){
            res.status(400).send({status:false, message:"Password is mendatory"})
        }
        let checkPhone = await userModel.findOne({phoneNumber:phoneNumber, password:password})
        if(!checkPhone){
            res.status(400).send({status:false, message: "Phone number and password dose not exist"})
        }


        let token = jwt.sign({
            phoneNumber:phoneNumber},
            'covid19'
        )
        res.setHeader("x-api-key",token)
        return res.status(200).send({status:true, data: token})

    } catch (error) {
        return res.status(500).send({status:false, message: error.message})
    }
}

//=========================// get center //==============================================

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}


module.exports = {createUser, loginUser, getByPin}

