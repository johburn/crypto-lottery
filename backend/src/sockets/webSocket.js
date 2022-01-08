const ethers = require ('ethers');
const logger = require('../utils/logger');
const lotteryContract = require('../contracts/LotteryGame.json');
const { db } = require('../utils/connectDB');

const EXPECTED_PONG_BACK = 15000
const KEEP_ALIVE_CHECK_INTERVAL = 7500

const startSocketConnection = () => {
    logger.info("starting socket connection");
    let pingTimeout = null
    let keepAliveInterval = null
    const provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_URL);
    const contract = new ethers.Contract(lotteryContract.address, lotteryContract.abi , provider);
    provider._websocket.on('open', () => {
      logger.info("websocket open")  
      keepAliveInterval = setInterval(() => {
            logger.trace('Checking if the connection is alive, sending a ping')
      
            provider._websocket.ping()
      
            pingTimeout = setTimeout(() => {
              provider._websocket.terminate()
            }, EXPECTED_PONG_BACK)
          }, KEEP_ALIVE_CHECK_INTERVAL)
      
          contract.on('LotteryCreated',async (id,ticketPrice, prize, date)=>{
            try {
            logger.info("Lottery Created event received");
            await db.one("INSERT INTO LOTTERY(id,ticketprice,prize,enddate) VALUES ($1,$2,$3,$4) RETURNING id",[id.toString(),ticketPrice.toString(),prize.toString(),new Date(date * 1000).toISOString()])
            } catch(error){
              logger.error(error.message)
            }
          });

          contract.on('PrizeIncreased',async(id,prize)=>{
            try{
            logger.info("Prize Increased event received");
            await db.none("UPDATE LOTTERY SET prize = $1 WHERE id = $2",[prize.toString(),id.toString()]);
            } catch(error){
              logger.error(error.message)
            }
          });

          contract.on('WinnerDeclared', async(requestId, id, winner) => {
            try {
            logger.info("Winner Declared event received");
            await db.none("UPDATE LOTTERY SET winner = $1 WHERE id = $2",[winner,id.String()]);
            } catch(error){
              logger.error(error.message)
            }
          });
    });

    provider._websocket.on('close', () => {
        logger.error('The websocket connection was closed')
        clearInterval(keepAliveInterval)
        clearTimeout(pingTimeout)
        startSocketConnection()
    })
    
    provider._websocket.on('pong', () => {
    logger.trace('Received pong, so connection is alive, clearing the timeout')
    clearInterval(pingTimeout)
    })
}


module.exports = { startSocketConnection }