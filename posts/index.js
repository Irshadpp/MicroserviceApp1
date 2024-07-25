const express = require('express');
const {randomBytes} = require('crypto');
const bodyparser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res)=>{
    res.send(posts);
});

app.post('/posts/create', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    }
    await axios.post('http://event-bus-srv:3005/events',{
        type: "PostCreated",
        data:{
            id, title
        }
    })

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res)=>{
    console.log('Event Recieved: ', req.body.type);

    res.send({});
})

app.listen(3000,()=>{
    console.log("Updating with rollout..........----=====------======-----====");
    console.log("Listening on port 3000")
})