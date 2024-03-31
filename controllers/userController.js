const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();


app.use(express.json());


const register = (req, res) => {
    const data = req.body;
    userModel.create(data)
      .then((data) => { console.log('user created successfully', data)})
      .catch((err) => { console.log('Error creating user', err)});
      res.send(data);
}


const login = (req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email})
    .then((user) => {
        if(!user){
            // user not found
        return res.status(404).json({message: 'User not found'});
          }
          // check if password is correct
          if(user.password !== password){
            return res.status(401).json({message: 'Incorrect password'});
          }

          // User found and password is correct
          const token = jwt.sign({name: user.name , id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
          console.log(token);
          res.status(200).json({message: 'Login successful', user});
    })
    .catch((err) => {
         console.log('Error finding user', err);
         res.status(500).json({message: 'Internal server error'});
 
    });
}


module.exports = {register, login}