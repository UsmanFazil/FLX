const { expect } = require("chai");
const bytes32 = require('bytes32');
const { ethers } = require('hardhat');

// Floyx Token testing
describe("Floyx Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Floyx");

    const hardhatToken = await Token.deploy("floyx","flx",100000000000000);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log(ownerBalance);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});


// Tokenomics Token test
describe("Tokenomics contract", function(){
  
  it("Deployment file", async function () {
    
    const [owner,addr1,addr2] = await ethers.getSigners();

    // Floyx Token Deployment
    const Token = await ethers.getContractFactory("Floyx");
    const hardhatToken = await Token.deploy("floyx","flx",'45000000000000000');


    const keccak256 = require('keccak256');
    const teamaddr = keccak256('TEAM_ROLE');
    const advisoraddr = keccak256('ADVISOR_ROLE');
    // Tokenomics Deployment
    const FloyxTokenomics = await ethers.getContractFactory("FloyxTokenomics");
    const hardhatFloyxTokenomics = await FloyxTokenomics.deploy(hardhatToken.address,
                                  [teamaddr,advisoraddr],[addr1.address,addr2.address],[5,5],[5,10]);
                                  
    const transfer = await hardhatToken.transfer(hardhatFloyxTokenomics.address,'40500000000000000')
  
    // forward time to seven days
    const sevenDays = 7 * 24 * 60 * 60;
    await ethers.provider.send('evm_increaseTime', [sevenDays]);

    // await expect(
    const fts = await hardhatFloyxTokenomics.connect(addr1).teamClaim();
    // ).to.be.revertedWith("Not enough tokens");

    const divident = await ethers.getContractFactory("Divident");
    const hardhatDivident = await divident.deploy(hardhatToken.address, hardhatFloyxTokenomics.address);
    await hardhatToken.transfer(hardhatDivident.address,'4500000000000000')

    const circulatingsupply = await hardhatDivident.CiculatingSupply();

    // consoles
    console.log("total supply",await hardhatToken.totalSupply()/100000000000000);
    console.log("before balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);
    console.log("Divident address balance:", await hardhatToken.balanceOf(hardhatDivident.address)/100000000000000);
    console.log("Tokenomics address balance:", await hardhatToken.balanceOf(hardhatFloyxTokenomics.address)/100000000000000);
    console.log("circulatingsupply",circulatingsupply/100000000000000);
    const resultt= await hardhatDivident.connect(addr1).ClaimDivident();

    console.log("contract balance",await hardhatDivident.contractBalance()/100000000000000);
    console.log("user balance",await hardhatDivident.userBalance()/100000000000000);
    console.log("user Percentage",await hardhatDivident.userPercentage());
    console.log("rewardAmountDistributed",await hardhatDivident.rewardAmountDistributed()/100000000000000);
    console.log("final balance",await hardhatToken.balanceOf(addr1.address)/100000000000000);


  });

});
