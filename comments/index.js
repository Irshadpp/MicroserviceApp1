const express = require('express');
const {randomBytes} = require('crypto');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req, res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
})



app.listen(3001, (req,res)=>{ console.log("Listening on port 3001")})