import { CandlestickChart, PlaceBet } from '@/components/game';
import React from 'react';

interface GameProps {
	id: string;
}

const Game = ({ id }: GameProps) => {
	return (
		<div className='flex flex-col gap-8 p-4 py-8 '>
			<div className='flex flex-col gap-8 lg:flex-row'>
				<div className='order-2 w-full basis-1/3 lg:order-1'>
					<PlaceBet />
				</div>
				<div className='order-1 w-full basis-2/3 lg:order-2'>
					<CandlestickChart />
				</div>
			</div>
		</div>
	);
};

export default Game;
