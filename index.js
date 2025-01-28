const express = require('express');
const axios = require('axios');
const https = require('https');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Disable SSL verification
    }),
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos");
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
