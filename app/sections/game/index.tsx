import React from 'react';
import { Spin } from 'antd';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Components
import {
	GameDetails,
	CandlestickChart,
	PlaceBet,
	LatestBetsTable,
	ClaimRewards,
	StatusCard,
} from '@/components/game';

// Icons
import { LoadingOutlined } from '@ant-design/icons';
import {
	PiChartLine,
	PiCoins,
	PiHourglassMedium,
	PiSmileySad,
} from 'react-icons/pi';

interface GameProps {
	id: string;
}

const Game = ({ id }: GameProps) => {
	const address = useAddress();
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: game, isLoading } = useContractRead(contract, 'Games', [id]);
	const { data: bet, isLoading: isBetLoading } = useContractRead(
		contract,
		'BetsforGame',
		[id, address]
	);

	if (isLoading) {
		return (
			<div className='flex w-full justify-center p-4'>
				<Spin
					indicator={
						<LoadingOutlined style={{ fontSize: 36, color: '#fff' }} spin />
					}
				/>
			</div>
		);
	} else if (
		!isLoading &&
		!!game &&
		game?.operator?.toString() === '0x0000000000000000000000000000000000000000'
	) {
		return <div>no game found</div>;
	} else {
		let gameStarted = Math.round(Date.now() / 1000) > game?.startAt?.toString();
		let stakingStarted =
			Math.round(Date.now() / 1000) > game?.stakingStartAt?.toString();
		let stakingEnded =
			Math.round(Date.now() / 1000) > game?.stakingEndAt?.toString();
		let gameEnded = Math.round(Date.now() / 1000) > game?.endAt?.toString();
		let resultsDeclared = game?.resultDeclared;
		let won = game?.result === bet?.betType;

		const getSymbol = (token: string) => {
			if (token === 'ethereum') return 'eth';
			else if (token === 'bitcoin') return 'btc';
			else if (token === 'polkadot') return 'pol';
		};

		return (
			<div className='flex flex-col gap-8 p-4 py-8 '>
				<GameDetails
					gameId={parseInt(id)}
					totalUpstaked={game?.totalAmountUpstaked?.toString() / 10 ** 18}
					totalDownstaked={game?.totalAmountDownstaked?.toString() / 10 ** 18}
					operatorAddress={game?.operator}
					isEnded={gameEnded}
					endAt={parseInt(game?.endAt?.toString())}
					stakingStartAt={parseInt(game?.stakingStartAt?.toString())}
					stakingEndAt={parseInt(game?.stakingEndAt?.toString())}
					token={game?.token}
				/>
				<div className='flex flex-col gap-8 lg:flex-row'>
					<div className='order-2 w-full basis-1/3 lg:order-1'>
						{!gameStarted && (
							<StatusCard text='Game has not started yet' Icon={PiChartLine} />
						)}
						{gameStarted && !stakingStarted && (
							<StatusCard text='Staking has not started yet' Icon={PiCoins} />
						)}
						{gameStarted && stakingStarted && !stakingEnded && (
							<PlaceBet
								gameId={parseInt(id)}
								BetType={bet?.betType}
								totalStaked={bet?.totalTokensStaked?.toString() / 10 ** 18}
							/>
						)}
						{gameStarted && stakingEnded && !gameEnded && (
							<StatusCard text='Staking has ended' Icon={PiCoins} />
						)}
						{gameEnded && !resultsDeclared && stakingEnded && (
							<StatusCard
								text='Waiting for results to be declared'
								Icon={PiHourglassMedium}
							/>
						)}
						{gameEnded && resultsDeclared && won && (
							<ClaimRewards
								gameId={parseInt(id)}
								totalTokensStaked={Math.floor(
									bet?.totalTokensStaked?.toString() / 10 ** 18
								)}
								totalTokensUpstaked={Math.floor(
									game?.totalAmountUpstaked?.toString() / 10 ** 18
								)}
								totalTokensDownstaked={Math.floor(
									game?.totalAmountDownstaked?.toString() / 10 ** 18
								)}
								result={game?.result}
								betType={bet?.betType}
							/>
						)}
						{gameEnded && resultsDeclared && !won && (
							<StatusCard text='Better luck next time...' Icon={PiSmileySad} />
						)}
					</div>
					<div className='order-1 w-full basis-2/3 lg:order-2'>
						<CandlestickChart symbol={getSymbol(game?.token?.at(0))!} />
					</div>
				</div>
				<LatestBetsTable gameId={parseInt(id)} />
			</div>
		);
	}
};

export default Game;
