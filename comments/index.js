const express = require('express');
const {randomBytes} = require('crypto');
const bodyparser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req, res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content, status:"pending"});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:3005/events',{
        type: "CommentCreated",
        data:{
            id: commentId,
            content,
            status: "pending",
            postId: req.params.id,
        }
    })

    res.status(201).send(comments);
});

app.post('/events', async (req, res)=>{
    const {type, data} = req.body;
    if(type === "CommentModerated"){
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];
    console.log(comments);
    const comment = comments.find(c => c.id === id);
    comment.status = status;
    console.log(comment)
    await axios.post('http://event-bus-srv:3005/events',{
        type: "CommentUpdated",
        data:{
            id,
            postId,
            status,
            content
        }
    })
}
    res.send({});
})



app.listen(3001, (req,res)=>{ console.log("Listening on port 3001")})