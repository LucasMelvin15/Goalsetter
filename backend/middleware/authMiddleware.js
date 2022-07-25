const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../model/userModel')
const { request } = require('http')

const protect = asyncHandler(async(res, req, next)=>{
      let token 
      if(req.header.authorization && req.header.authorization.startsWith('Bearer')){
         try{
           //get token from header
           token = req.header.authorization.split(' ')[1]

           //verify token 
          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          // get user from token 
          req.user = await User.findById(decoded.id).select('-password')

          next()

         }catch (error){
            console.log(error)
            res.status(401)
            throw new Error ('Not Authorized')
         }
        
      }

      if(!token){
       // console.log('ERR 401')
        res.status(401)
        
        throw new Error('Not authorized ,no  token ')
      }
})

module.exports = {protect}