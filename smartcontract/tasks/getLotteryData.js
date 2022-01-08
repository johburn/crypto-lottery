task("lottery-data", "Get lottery data from the blockchain")
  .addParam("contract", "The contract address")
  .addParam("lotteryid", "The lottery id")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    const LotteryContract = await ethers.getContractFactory("LotteryGame");
    const [deployer] = await ethers.getSigners();
    const lotteryContract = new ethers.Contract(
      contractAddr,
      LotteryContract.interface,
      deployer
    );
    const lottery = await lotteryContract.getLottery(
      parseInt(taskArgs.lotteryid)
    );
    console.log(lottery);
  });

module.exports = {};
