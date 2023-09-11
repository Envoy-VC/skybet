import React from 'react';
import {
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
	let gameEnded = true;
	let resultsDeclared = true;
	let won = true;
	return (
		<div className='flex flex-col gap-8 p-4 py-8 '>
			<div className='flex flex-col gap-8 lg:flex-row'>
				<div className='order-2 w-full basis-1/3 lg:order-1'>
					{!gameEnded && <PlaceBet />}
					{gameEnded && !resultsDeclared && <NoResults />}
					{gameEnded && resultsDeclared && won && <ClaimRewards />}
					{gameEnded && resultsDeclared && !won && <BestLost />}
				</div>
				<div className='order-1 w-full basis-2/3 lg:order-2'>
					<CandlestickChart />
				</div>
			</div>
			<LatestBetsTable />
		</div>
	);
};

export default Game;
