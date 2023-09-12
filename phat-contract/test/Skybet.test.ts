import { expect } from 'chai';
import { type Contract, type Event } from 'ethers';
import { ethers } from 'hardhat';
import { execSync } from 'child_process';

import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';

async function waitForResponse(consumer: Contract, event: Event) {
	const [, data] = event.args!;
	// Run Phat Function
	const result = execSync(
		`phat-fn run --json dist/index.js -a ${data} https://api.coingecko.com/api/v3`
	).toString();
	const json = JSON.parse(result);
	const action = ethers.utils.hexlify(
		ethers.utils.concat([new Uint8Array([0]), json.output])
	);
	// Make a response
	const tx = await consumer.rollupU256CondEq(
		// cond
		[],
		[],
		// updates
		[],
		[],
		// actions
		[action]
	);
	const receipt = await tx.wait();
	return receipt.events;
}

describe('Skybet Contract', async function () {
	async function deploySkybetContracts() {
		let [deployer, user1, user2] = await ethers.getSigners();
		const Skybet = await ethers.getContractFactory('Skybet');
		const SkybetToken = await ethers.getContractFactory('SkybetToken');

		const SkybetTokenInstance = await SkybetToken.connect(deployer).deploy();
		const SkybetInstance = await Skybet.connect(deployer).deploy(
			SkybetTokenInstance.address
		);

		await SkybetInstance.setAttestor(deployer.address);

		return { SkybetTokenInstance, SkybetInstance, deployer, user1, user2 };
	}

	it('Should deploy both contracts', async () => {
		let { SkybetTokenInstance, SkybetInstance } = await deploySkybetContracts();
		console.log('\nSkybetToken deployed to:', SkybetTokenInstance.address);
		console.log('Skybet deployed to:', SkybetInstance.address);
		expect(SkybetTokenInstance.address).to.not.equal(null);
		expect(SkybetInstance.address).to.not.equal(null);
	});

	it('Should correctly set constructor arguments', async () => {
		let { SkybetTokenInstance, SkybetInstance } = await deploySkybetContracts();
		expect(await SkybetInstance.STAKE_TOKEN.call([])).to.be.equal(
			SkybetTokenInstance.address
		);
		expect(await SkybetInstance.Tokens.call([], 0)).to.be.equal('ethereum');
	});

	it('Should correctly set the owner', async () => {
		let { SkybetInstance, deployer } = await deploySkybetContracts();
		expect(await SkybetInstance.owner.call([])).to.be.equal(deployer.address);
	});

	it('Should add new Token', async () => {
		let { SkybetInstance, deployer } = await deploySkybetContracts();
		await SkybetInstance.connect(deployer).addToken('bitcoin');
		expect(await SkybetInstance.Tokens.call([], 1)).to.be.equal('bitcoin');
	});

	it('Should not allow users to add a token', async () => {
		let { SkybetInstance, user1 } = await deploySkybetContracts();
		try {
			await SkybetInstance.connect(user1).addToken('bitcoin');
		} catch (error) {}

		expect(await SkybetInstance.Tokens.call([], 1)).to.be.equal('');
	});

	it('Should revert when adding duplicate Token', async () => {
		let { SkybetInstance, deployer } = await deploySkybetContracts();
		try {
			await SkybetInstance.connect(deployer).addToken('ethereum');
		} catch (error) {}

		expect(await SkybetInstance.Tokens.call([], 1)).to.be.equal('');
	});

	it('Should create a new Game', async () => {
		let { SkybetInstance, deployer } = await deploySkybetContracts();
		let currentTime = await time.latest();
		let startAt = currentTime + time.duration.minutes(1);
		let stakingStartAt = currentTime + time.duration.minutes(1);
		let stakingEndAt = currentTime + time.duration.hours(1);
		let endAt = currentTime + time.duration.hours(2);

		let res = await SkybetInstance.connect(deployer).createGame(
			deployer.address,
			startAt,
			stakingStartAt,
			stakingEndAt,
			endAt,
			0
		);

		expect(res).to.emit(SkybetInstance, 'GameCreated');
	});

	it('Should Stake and Unstake Tokens', async () => {
		let { SkybetTokenInstance, SkybetInstance, deployer, user1 } =
			await deploySkybetContracts();

		// Create Game
		let currentTime = await time.latest();
		let startAt = currentTime + time.duration.seconds(1);
		let stakingStartAt = currentTime + time.duration.seconds(1);
		let stakingEndAt = currentTime + time.duration.hours(1);
		let endAt = currentTime + time.duration.hours(2);

		await SkybetInstance.connect(deployer).createGame(
			deployer.address,
			startAt,
			stakingStartAt,
			stakingEndAt,
			endAt,
			0
		);

		await time.increase(time.duration.seconds(2));

		// Give some Tokens to User 1
		await SkybetTokenInstance.connect(user1).mint(
			user1.address,
			ethers.utils.parseEther('100')
		);

		expect(await SkybetTokenInstance.balanceOf(user1.address)).to.be.equal(
			ethers.utils.parseEther('100')
		);

		// Add Allowance
		let allowance = await SkybetTokenInstance.connect(user1).approve(
			SkybetInstance.address,
			ethers.utils.parseEther('100')
		);

		expect(
			await SkybetTokenInstance.allowance(user1.address, SkybetInstance.address)
		).to.be.equal(ethers.utils.parseEther('100'));

		// Stake Tokens
		let res = await SkybetInstance.connect(user1).addStake(
			0,
			0,
			ethers.utils.parseEther('100')
		);

		expect(res)
			.to.emit(SkybetInstance, 'AmountStaked')
			.withArgs(user1.address, 0, 0, ethers.utils.parseEther('100'));

		expect(
			await SkybetTokenInstance.balanceOf(SkybetInstance.address)
		).to.be.equal(ethers.utils.parseEther('100'));

		expect(await SkybetTokenInstance.balanceOf(user1.address)).to.be.equal(
			ethers.utils.parseEther('0')
		);

		let bet = await SkybetInstance.BetsforGame(0, user1.address);
		expect(bet.betType).to.be.equal(0);
		expect(bet.totalTokensStaked).to.be.equal(ethers.utils.parseEther('100'));
		expect(bet.hasClaimed).to.be.equal(false);

		// Unstake Tokens
		let resp = await SkybetInstance.connect(user1).removeStake(
			0,
			ethers.utils.parseEther('10')
		);

		expect(resp)
			.to.emit(SkybetInstance, 'AmountUnstaked')
			.withArgs(user1.address, 0, ethers.utils.parseEther('10'));

		expect(await SkybetTokenInstance.balanceOf(user1.address)).to.be.equal(
			ethers.utils.parseEther('10')
		);

		expect(
			await SkybetTokenInstance.balanceOf(SkybetInstance.address)
		).to.be.equal(ethers.utils.parseEther('90'));

		let newBet = await SkybetInstance.BetsforGame(0, user1.address);
		expect(newBet.betType).to.be.equal(0);
		expect(newBet.totalTokensStaked).to.be.equal(ethers.utils.parseEther('90'));
		expect(newBet.hasClaimed).to.be.equal(false);
	});

	it('Should declare result', async () => {
		let { SkybetTokenInstance, SkybetInstance, deployer, user1, user2 } =
			await deploySkybetContracts();

		// Create Game
		let currentTime = await time.latest();
		let startAt = currentTime + time.duration.seconds(1);
		let stakingStartAt = currentTime + time.duration.seconds(1);
		let stakingEndAt = currentTime + time.duration.hours(1);
		let endAt = currentTime + time.duration.hours(2);

		await SkybetInstance.connect(deployer).createGame(
			deployer.address,
			startAt,
			stakingStartAt,
			stakingEndAt,
			endAt,
			0
		);

		await time.increase(time.duration.seconds(2));

		// Give some Tokens to User 1 and User 2
		await SkybetTokenInstance.connect(user1).mint(
			user1.address,
			ethers.utils.parseEther('600')
		);

		await SkybetTokenInstance.connect(user2).mint(
			user2.address,
			ethers.utils.parseEther('400')
		);

		// Add Allowance
		await SkybetTokenInstance.connect(user1).approve(
			SkybetInstance.address,
			ethers.utils.parseEther('600')
		);

		await SkybetTokenInstance.connect(user2).approve(
			SkybetInstance.address,
			ethers.utils.parseEther('400')
		);

		// Stake Tokens
		await SkybetInstance.connect(user1).addStake(
			0,
			0,
			ethers.utils.parseEther('600')
		);

		await SkybetInstance.connect(user2).addStake(
			0,
			1,
			ethers.utils.parseEther('400')
		);

		// Time forward to end game
		await time.increase(time.duration.hours(3));

		let tx = await SkybetInstance.connect(deployer).declareResult(0);
		let receipt = await tx.wait();
		const reqEvents = receipt?.events;
		expect(tx).to.emit(SkybetInstance, 'MessageQueued');

		// Wait for Phat Function Response
		const respEvents = await waitForResponse(SkybetInstance, reqEvents![0]);
		expect(respEvents[1]).to.have.property('event', 'ResponseReceived');
		let game = await SkybetInstance.Games.call(0, 0);
		expect(game.resultDeclared).to.be.equal(true);
		expect(game.result).to.be.equal(0);
	});

	it('Should withdraw rewards', async () => {
		let { SkybetTokenInstance, SkybetInstance, deployer, user1, user2 } =
			await deploySkybetContracts();

		// Create Game
		let currentTime = await time.latest();
		let startAt = currentTime + time.duration.seconds(1);
		let stakingStartAt = currentTime + time.duration.seconds(1);
		let stakingEndAt = currentTime + time.duration.hours(1);
		let endAt = currentTime + time.duration.hours(2);

		await SkybetInstance.connect(deployer).createGame(
			deployer.address,
			startAt,
			stakingStartAt,
			stakingEndAt,
			endAt,
			0
		);

		await time.increase(time.duration.seconds(2));

		// Give some Tokens to User 1 and User 2
		await SkybetTokenInstance.connect(user1).mint(
			user1.address,
			ethers.utils.parseEther('600')
		);

		await SkybetTokenInstance.connect(user2).mint(
			user2.address,
			ethers.utils.parseEther('400')
		);

		// Add Allowance
		await SkybetTokenInstance.connect(user1).approve(
			SkybetInstance.address,
			ethers.utils.parseEther('600')
		);

		await SkybetTokenInstance.connect(user2).approve(
			SkybetInstance.address,
			ethers.utils.parseEther('400')
		);

		// Stake Tokens
		await SkybetInstance.connect(user1).addStake(
			0,
			0,
			ethers.utils.parseEther('600')
		);

		await SkybetInstance.connect(user2).addStake(
			0,
			1,
			ethers.utils.parseEther('400')
		);

		// Time forward to end game
		await time.increase(time.duration.hours(2));

		let tx = await SkybetInstance.connect(deployer).declareResult(0);
		let receipt = await tx.wait();
		const reqEvents = receipt?.events;
		expect(tx).to.emit(SkybetInstance, 'MessageQueued');

		// Wait for Phat Function Response
		const respEvents = await waitForResponse(SkybetInstance, reqEvents![0]);

		// Withdraw Balances
		let game = await SkybetInstance.Games.call(0, 0);
		let bet = await SkybetInstance.BetsforGame(0, user1.address);

		expect(game.totalAmountDownstaked).to.equal(ethers.utils.parseEther('600'));

		expect(game.totalAmountDownstaked.add(game.totalAmountUpstaked)).to.equal(
			ethers.utils.parseEther('1000')
		);

		expect(bet.betType).to.equal(0);
		expect(bet.totalTokensStaked).to.equal(ethers.utils.parseEther('600'));

		await SkybetInstance.connect(user1).withdrawWinnings(0);

		expect(await SkybetTokenInstance.balanceOf(user1.address)).to.equal(
			ethers.utils.parseEther('1000')
		);

		expect(
			(await SkybetInstance.BetsforGame(0, user1.address)).totalTokensStaked
		).to.equal(ethers.utils.parseEther('0'));

		expect(await SkybetTokenInstance.balanceOf(deployer.address)).to.equal(
			ethers.utils.parseEther('10000')
		);
	});
});
