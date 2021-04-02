const DankMint = artifacts.require("DankMint");

module.exports = function (deployer) {
    deployer.deploy(DankMint);
};
