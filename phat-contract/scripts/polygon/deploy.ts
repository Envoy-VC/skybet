import { ethers } from 'hardhat';
import 'dotenv/config';
import dedent from 'dedent';

async function main() {
	const SkybetTokenContract = await ethers.getContractFactory('SkybetToken');
	const SkybetContract = await ethers.getContractFactory('Skybet');

	const [deployer] = await ethers.getSigners();

	console.log('Deploying Skybet Token...');
	const token = await SkybetTokenContract.deploy();
	await token.deployed();
	console.log(`Skybet Token deployed to: ${token.address}`);

	console.log('Deploying Skybet...');
	const skybet = await SkybetContract.deploy(token.address);
	await skybet.deployed();
	console.log(`Skybet deployed to: ${skybet.address}`);

	const finalMessage = dedent`
    🎉 Your Skybet  Contract has been deployed, check it out here: https://polygonscan.com/address/${skybet.address}
    
    You also need to set up the consumer contract address in your .env file:
    
    POLYGON_CONSUMER_CONTRACT_ADDRESS=${skybet.address}
  `;
	console.log(`\n${finalMessage}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
