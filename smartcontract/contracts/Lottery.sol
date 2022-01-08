// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract LotteryGame is VRFConsumerBase {

    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private lotteryId;
    mapping(uint256 => Lottery) private lotteries;
    mapping(bytes32 => uint256) private lotteryRandomnessRequest;
    mapping(uint256 => mapping(address => uint256)) ppplayer; // participations per player per lottery
    mapping(uint256 => uint256) playersCount;
    bytes32 private keyHash;
    uint256 private fee;
    address private admin;

    event RandomnessRequested(bytes32,uint256);
    event WinnerDeclared(bytes32,uint256,address);
    event PrizeIncreased(uint256,uint256);
    event LotteryCreated(uint256,uint256,uint256,uint256);

    struct Lottery {
        uint256 lotteryId;
        address[] participants;
        uint256 ticketPrice;
        uint256 prize;
        address winner;
        bool isFinished;
        uint endDate;
    }

    constructor(address vrfCoordinator, address link, bytes32 _keyhash, uint256 _fee) 
    VRFConsumerBase(vrfCoordinator, link)
    {
        keyHash = _keyhash;
        fee = _fee;
        admin = msg.sender;
    }

    function createLottery(uint256 _ticketPrice,uint256 _seconds) payable public onlyAdmin {
        require(_ticketPrice > 0, "Value must be greater than 0");
        Lottery memory lottery = Lottery({
            lotteryId: lotteryId.current(),
            participants: new address[](0),
            prize: 0,
            ticketPrice: _ticketPrice,
            winner: address(0),
            isFinished: false,
            endDate: block.timestamp + _seconds * 1 seconds
        });
        lotteries[lotteryId.current()] = lottery;
        lotteryId.increment();
        emit LotteryCreated(lottery.lotteryId,lottery.ticketPrice,lottery.prize,lottery.endDate);
    }

    function participate(uint256 _lotteryId) public payable {
        Lottery storage lottery = lotteries[_lotteryId];
        require(block.timestamp < lottery.endDate,"Lottery participation is closed");
        require(lottery.ticketPrice == msg.value, "Value must be equal to ticket price");
        lottery.participants.push(msg.sender);
        lottery.prize += msg.value;
        uint256 uniqueP = ppplayer[_lotteryId][msg.sender];
        if(uniqueP == 0) {
            playersCount[_lotteryId]++;
        }
        ppplayer[_lotteryId][msg.sender]++;
        
        emit PrizeIncreased(lottery.lotteryId, lottery.prize);
    }

    function declareWinner(uint256 _lotteryId) public onlyAdmin {
        Lottery storage lottery = lotteries[_lotteryId];
        require(block.timestamp > lottery.endDate,"Lottery is still active");
        require(!lottery.isFinished,"Lottery has already declared a winner");
        if(playersCount[_lotteryId] == 1) {
            require(lottery.participants[0] != address(0), "There has been no participation in this lottery");
            lottery.winner = lottery.participants[0];
            lottery.isFinished = true;
            (bool success,) = lottery.winner.call{value: lottery.prize }("");
            require(success, "Transfer failed");
        } else {
            require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
            bytes32 requestId = requestRandomness(keyHash, fee);
            lotteryRandomnessRequest[requestId] = _lotteryId;
            emit RandomnessRequested(requestId,_lotteryId);
        }
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 _lotteryId = lotteryRandomnessRequest[requestId];
        Lottery storage lottery = lotteries[_lotteryId];
        uint256 winner = randomness.mod(lottery.participants.length);
        lottery.isFinished = true;
        lottery.winner = lottery.participants[winner];
        delete lotteryRandomnessRequest[requestId];
        delete playersCount[_lotteryId];
        lottery.winner.call{value: lottery.prize }("");
        emit WinnerDeclared(requestId,lottery.lotteryId,lottery.winner);
    }

    function getLottery(uint256 _lotteryId) public view returns (Lottery memory) {
        return lotteries[_lotteryId];
    }

    function getLotteryCount() public view returns(uint256) {
        return lotteryId.current();
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
}