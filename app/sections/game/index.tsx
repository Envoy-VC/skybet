import CandlestickChart from '@/components/game/candlestick-chart';
import React from 'react';

interface GameProps {
	id: string;
}

const Game = ({ id }: GameProps) => {
	return (
		<div className='flex flex-col gap-8 p-4 py-8 '>
			<div className='flex flex-col gap-8 lg:flex-row'>
				<div className='w-full basis-1/3'>place bet </div>
				<div className='w-full basis-2/3'>
					<CandlestickChart />
				</div>
			</div>
		</div>
	);
};

export default Game;
