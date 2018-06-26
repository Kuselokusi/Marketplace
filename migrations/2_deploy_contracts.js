var Marketplace = artifacts.require("./Marketplace.sol");

//deploy the marketplace contract
module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};
