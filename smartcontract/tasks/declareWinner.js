task("declare-winner", "Declare a winner and transfer the prize")
  .addParam("contract", "The contract address")
  .addParam("lotteryid", "Lottery id")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    const LotteryContract = await ethers.getContractFactory("LotteryGame");
    const [deployer] = await ethers.getSigners();
    const lotteryContract = new ethers.Contract(
      contractAddr,
      LotteryContract.interface,
      deployer
    );
    const lotteryTx = await lotteryContract.declareWinner(
      parseInt(taskArgs.lotteryid)
    );
    await lotteryTx.wait();
    console.log("Transaction Mined");
  });

module.exports = {};
