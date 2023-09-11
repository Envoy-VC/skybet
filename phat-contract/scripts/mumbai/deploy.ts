import { ethers } from 'hardhat';
import 'dotenv/config';

async function main() {
	const SkybetContract = await ethers.getContractFactory('Skybet');

	const [deployer] = await ethers.getSigners();

	console.log('Deploying...');
	const attestor =
		process.env['MUMBAI_LENSAPI_ORACLE_ENDPOINT'] || deployer.address; // When deploy for real e2e test, change it to the real attestor wallet.
	const consumer = await SkybetContract.deploy(attestor, deployer.address);
	await consumer.deployed();
	console.log('Deployed', {
		consumer: consumer.address,
	});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
