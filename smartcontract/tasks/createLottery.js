task("create", "Create a lottery")
  .addParam("contract", "The contract address")
  .addParam("seconds", "Lottery period in seconds")
  .addParam("price", "Lottery ticket price in wei")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    const LotteryContract = await ethers.getContractFactory("LotteryGame");
    const [deployer] = await ethers.getSigners();
    const lotteryContract = new ethers.Contract(
      contractAddr,
      LotteryContract.interface,
      deployer
    );
    const lotteryTx = await lotteryContract.createLottery(
      ethers.utils.parseEther(taskArgs.price),
      parseInt(taskArgs.seconds),
    );
    await lotteryTx.wait();
    console.log("Transaction Mined");
  });

module.exports = {};
