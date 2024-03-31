const postModel = require('../models/post')
const express = require('express')
const app = express()
app.use(express.json());

const getPost = (req, res) =>{
    postModel.find()
        .then((data)=>{res.status(201).send(data);})
        .catch((err)=>{res.status(401).send(err)});
}


const addPost = (req, res) =>{
    const postData = req.body;
    postModel.create(postData)
      .then((data)=>{console.log('post created successfully', data)})
      .catch((err)=>{console.log('error creating post', err)});
    res.send(postData);
}

const assignPost = (req,res) => {
    const title = req.params.title;
    const updatePost = req.body;
    postModel.findOneAndUpdate({title}, updatePost, {new: true})
    .then((post) => {
        if(post) {
            res.status(200).json(post);
        }else {
            throw new Error('Couldn\'t find post')
        }
    })
    .catch((err)=>{res.status(404).json(err.message)});
}


const deletePost = async (req, res) =>{
    try{
        const deleted = await postModel.findOneAndDelete({title:req.params.title});
        if(!deleted){
            return res.status(404).json({message: 'No post found '})
        }

        console.log('The post has been deleted', deleted);
        return res.status(200).json({message: 'Post deleted successfully', deleted});
    }catch(e){
        console.error("Error found ", error);
        return res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = { getPost, addPost, assignPost, deletePost};