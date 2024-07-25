const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

let events = [];

app.post('/events', (req,res)=>{
    const event = req.body;
    events.push(event)
    axios.post('http://posts-clusterip-srv:3000/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://comments-srv:3001/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://quary-srv:3010/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://moderation-srv:3006/events', event).catch((err) => {
        console.log(err.message);
      });

    res.send({status: "OK"})
});

app.get('/events', (req, res)=>{
    res.send(events);
})

app.listen(3005, (req,res) =>{ console.log("Listening on port 3005")});