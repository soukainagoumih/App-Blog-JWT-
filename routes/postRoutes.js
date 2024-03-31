const express = require('express')
const postRouter = express.Router()
const {getPost,addPost,assignPost, deletePost} = require('../controllers/postController')
const authorization = require('../middleware/middelware')




postRouter.get('/',authorization,  getPost)
.patch('/:title',authorization, assignPost)
.put('/:title',authorization, assignPost)
.post('/newer',authorization, addPost)
.delete('/:title',authorization, deletePost)



module.exports = postRouter;