import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const name = "Place";
  const symbol = "PLACE";
  const price = "1000000000000000000";
  const imageURI = "ipfs://";

  const contactInformation = {
    name: "Place",
    description: "A beautiful place in the Ethereal",
    image: "ipfs://QmR1tCdArDcAKmCJezMhZxRGqfxhMdTHmGJZAhtriFa41t",
    externalLink: "https://places.kames.me",
    sellerFeeBasisPoints: "0",
    feeRecipient: "0x0000000000000000000000000000000000000000"
  };

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Place", {
    contract: "Place",
    from: deployer,
    skipIfAlreadyDeployed: false,
    args: [name, symbol, imageURI, price, deployer, contactInformation],
    log: true
  });
}
