const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors())

let posts = {};

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events', (req, res)=>{
    const {type, data} = req.body;
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments:[]}
    }
    if(type === 'CommentCreated'){
        const {postId, id, content, status} = data;
        const post = posts[postId]
        post.comments.push({id, content, status});
    }

    if(type === 'CommentUpdated'){
        const {postId, id, content, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(c => c.id === id);
        comment.status = status;
        comment.content = content;
    }
    console.log(posts)
    res.send({})
});


app.listen(3010, (req,res)=>{console.log('Listening on port 3010')});