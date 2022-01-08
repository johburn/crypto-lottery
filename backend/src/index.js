require("dotenv").config();
const express = require('express');
const logger = require('./utils/logger');
const {db} = require('./utils/connectDB')
const {startSocketConnection} = require('./sockets/webSocket');

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/lotteries',async(req,res)=>{
    try {
        const lotteries = await db.query("SELECT id,ticketprice,prize,enddate from lottery");
        res.status(200).send(lotteries);
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
})

app.listen(process.env.PORT, ()=>{
    logger.info("Server started");
    startSocketConnection();
});