const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

const bytecode = fs
  .readFileSync(
    path.join(__dirname, "../contracts/UserInformation_sol_UserInformation.bin")
  )
  .toString();
const abi = JSON.parse(
  fs
    .readFileSync(
      path.join(
        __dirname,
        "../contracts/UserInformation_sol_UserInformation.abi"
      )
    )
    .toString()
);

const web3 = new Web3("https://mainnet.infura.io/v3/c979607e89d8401d8757eeb34272be8a");
const contract = new web3.eth.Contract(abi);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas();

  const result = await contract.deploy({ data: bytecode }).send({
    from: accounts[0],
    gas: gasEstimate,
  });

  console.log(`Contract deployed at address: ${result.options.address}`);
})();
