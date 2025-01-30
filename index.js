const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MAX_RETRIES = 2

app.use(express.json());

const axiosInstance = axios.create();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


axiosInstance.interceptors.response.use(null,async(error)=>{
    let retries = error.config.__retryCount || 0
    
    if(retries>=MAX_RETRIES) return Promise.reject(error);

    retries+=1  
    error.config.__retryCount = retries //saving the retry number

    const delay = Math.pow(2,retries-1)*1000  //exponential backoffs

    console.log(`Retry attempt in ${retries} in ${delay/1000} seconds`)

    await new Promise(resolve=>setTimeout(resolve,delay)) //delay before new try

    return axiosInstance(error.config) //retrying the API call

})

app.get('/fetch-users', async (req, res) => {
    try {
        const { data } = await axiosInstance.get(process.env.BASE_URL);
        return res.status(200).json(data);
    } catch (error) {
        if(error.response){
            return res.status(error.response.status).json({status:error.response.status,error:error.response.statusText})
        }
        return res.status(error.status||500).json({ error: error.statusText  });
    }
});

app.post('/post-user',async(req,res)=>{
    try{
       const response =  await axiosInstance.post(process.env.BASE_URL,req.body)
        return res.status(response.status).json(response.data)
    }catch(error){
        if (error.response) {
            return res.status(error.response.status).json({
                status:error.response.status || 500, 
                error: error.response.statusText || "Request Failed"
                
            });
        }
        return res.status(error.status||500).json({ error: error.statusText || "Internal Sever Error"});
    }
})

app.put('/update-user/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const userPresent = await axiosInstance.get(process.env.BASE_URL+`/${id}`) //to check if the user to be updated is present
        const response = await axiosInstance.put(process.env.BASE_URL+`/${id}`,req.body)
        return res.status(response.status).json(response.data)
    }catch(error){
        if (error.response) {
            return res.status(error.response.status).json({
                status:error.response.status || 500, 
                error: error.response.statusText || "Request Failed"
                
            });
        }
        return res.status(error.status||500).json({error:error.statusText || "Internal Sever Error"})
    }
})

app.delete('/delete-user/:id',async(req,res)=>{
    const {id} = req.params;
    try{

        const userPresent = await axiosInstance.get(process.env.BASE_URL+`/${id}`) //to check if the user to be deleted is present
        const response = await axiosInstance.delete(process.env.BASE_URL+`/${id}`)
        return res.status(response.status).json(`Deleted record of ID ${id}`)
    }catch(error){
        if (error.response) {
            return res.status(error.response.status).json({
                status:error.response.status || 500, 
                error: error.response.statusText || "Request Failed"
                
            });
        }
        return res.status(error.status||500).json({error:error.statusText || "Internal Sever Error"})
    }
})
