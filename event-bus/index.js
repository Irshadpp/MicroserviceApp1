const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

app.post('/events', (req,res)=>{
    const event = req.body;

    axios.post('http://localhost:3000/events', event);
    axios.post('http://localhost:3001/events', event);
    axios.post('http://localhost:3010/events', event);
    axios.post('http://localhost:3006/events', event);

    res.send({status: "OK"})
});

app.listen(3005, (req,res) =>{ console.log("Listening on port 3005")});