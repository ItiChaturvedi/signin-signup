const express = require("express")
const User = require('../model/userAuth')
const auth = require('../middleware/auth')
const validator = require('validator')
const router = new express.Router()

router.post('/signup', async (req, res) => {
       
    try {
        const isUser = await User.findByEmailId(req.body.email)
        if(isUser){
            throw new Error('User is already exist for this email:'+req.body.email)
        }    
        const user = new User(req.body)  

        await user.save()
        const token = await user.generateAuthToken()
        const response = {
            id:user._id,
            status:'success',
            message:'user created successfully',
            token:token
        };
        res.status(201).send(response)

    } catch (e) {
        let response = {
            status:'error',
            message: e.message
        };
        res.status(400).send(response)
    }
})



router.post('/login', async(req, res) => {
    try {
        if(!validator.isEmail(req.body.email)) {
            throw new Error('Email is invalid')
        }

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const response = {
            id:user._id,
            status:'success',
            message:'login successfully',
            token:token
        };
        res.status(200).send(response)
      
        
    } catch (e) {
        let response = {
            status:'error',
            message: e.message
        };
        res.status(400).send(response)
    }
})

// router.get('/users', async (req, res) => {
//     try{
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/users/profile', auth, async(req , res) => {
    let user =req.user;
    let token=req.token;
    const response = {
        id:user._id,
        name: user.name,
        email: user.email,
        status:'success',
        message:'User Profile data found.'
    };
    res.status(200).send(response)
})



module.exports = router;