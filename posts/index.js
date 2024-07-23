const express = require('express');
const {randomBytes} = require('crypto');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

const posts = {};

app.get('/posts', (req, res)=>{
    res.send(posts);
});

app.post('/posts', (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id]);
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})