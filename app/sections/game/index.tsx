import React from 'react';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Components
import {
	GameDetails,
	CandlestickChart,
	PlaceBet,
	LatestBetsTable,
	NoResults,
	BestLost,
	ClaimRewards,
} from '@/components/game';

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
		return <div>Loading...</div>;
	} else if (
		!isLoading &&
		!!game &&
		game?.operator?.toString() === '0x0000000000000000000000000000000000000000'
	) {
		return <div>no game found</div>;
	} else {
		let gameEnded = Math.round(Date.now() / 1000) > game?.endAt?.toString();
		let resultsDeclared = game?.resultDeclared;
		let won = game?.result === bet?.betType;

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
				/>
				<div className='flex flex-col gap-8 lg:flex-row'>
					<div className='order-2 w-full basis-1/3 lg:order-1'>
						{!gameEnded && (
							<PlaceBet
								gameId={parseInt(id)}
								BetType={bet?.betType}
								totalStaked={bet?.totalTokensStaked?.toString() / 10 ** 18}
							/>
						)}
						{gameEnded && !resultsDeclared && <NoResults />}
						{gameEnded && resultsDeclared && won && <ClaimRewards />}
						{gameEnded && resultsDeclared && !won && <BestLost />}
					</div>
					<div className='order-1 w-full basis-2/3 lg:order-2'>
						<CandlestickChart />
					</div>
				</div>
				<LatestBetsTable gameId={parseInt(id)} />
			</div>
		);
	}
};

export default Game;
