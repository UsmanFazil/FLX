async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Contract = await ethers.getContractFactory("ICOTokenCrowdsale");
    const contract = await Contract.deploy("100","10","0x6de052e5539A5B1566cD23CDE759b88D279e4E25", "10000000000000","0xf1C179f53F777BD87c7b95b608c0ec9373F2F5d6", "0x7Dfaa885D371F2759d75a1D3245e62Dc935401d3", "0x02c5d47a3AC38D61AE9949ef5c3971ac8898cAb8", "1651752000", "100000000000");

    // const Contract = await ethers.getContractFactory("FloyxTokenomics");
    // const contract = await Contract.deploy();
  
    console.log("Contract address:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });