const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyparser.json());

app.post('/events', async (req, res)=>{
    const {type, data} = req.body;
    if(type === "CommentCreated"){
        let status = data.content.includes('hello') ? "rejected" : "approved";
        await axios.post("http://localhost:3005/events",{
            type: "CommentModerated",
            data:{
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }
    res.send({})
});

app.listen(3006, (req,res)=>{ console.log("Listening on port 3006")});