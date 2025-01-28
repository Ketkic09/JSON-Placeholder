const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


app.get('/fetch-users', async (req, res) => {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(error.status).json({ error: 'Internal Server Error' });
    }
});

app.post('/post-user',async(req,res)=>{
    try{
    
       const response =  await axios.post("https://jsonplaceholder.typicode.com/users",req.body)
        return res.status(response.status).json(response.data)
    }catch(error){
        console.error(error.message);
        return res.status(error.status).json({ error: 'Internal Server Error' });
    }
})

app.put('/update-user/:id',async(req,res)=>{
    const {id} = req.params;
    console.log('url: ', process.env.BASE_URL+`/${id}`)
    try{
        const response = await axios.put(process.env.BASE_URL+`/${id}`,req.body)
        return res.status(response.status).json(response.data)
    }catch(error){
        console.log(error)
        return res.status(error.status).json({error:error.statusText})
    }
})

app.delete('/delete-user/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await axios.delete(process.env.BASE_URL+`/${id}`)
        return res.status(response.status).json(response.data)
    }catch(error){
        console.log(error)
        return res.status(error.status).json({error:error.statusText})
    }
})