const DocumentNotarization = artifacts.require("DocumentNotarization");

module.exports = function (deployer) {
  deployer.deploy(DocumentNotarization);
};
