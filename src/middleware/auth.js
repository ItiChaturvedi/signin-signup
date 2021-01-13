const jwt = require('jsonwebtoken')
const User = require('../model/userAuth')

const auth = async (req, res, next) => {
    try{
        if(!req.header ('Authorization')){
            throw new Error ("Please provide Authorization header")
        } 

        const token = req.header ('Authorization').replace('Bearer', '').trim()
        if(!token){
            throw new Error ("Please provide token in Authorization header")
        } 
        const decoded = jwt.verify(token, 'firstsignature')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error("User does not exist.")
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        let response = {
            status:'error',
            message: e.message
        };
        res.status(400).send(response)
       
    }
   
}

module.exports = auth