import React from 'react';
import Image from 'next/image';

import EthLogo from '@/public/eth-logo.svg';

const GameCard = () => {
	return (
		<div className='flex flex-col gap-3 rounded-xl bg-[#161925] p-4'>
			<div className='flex flex-row items-center gap-4'>
				<Image alt='coin-logo' src={EthLogo} width={24} />
				<span className='text-xl font-semibold'>Game #1</span>
			</div>
			<div className='flex flex-col gap-1 text-[0.9rem]'>
				<span>
					Total Upstaked: <span className='text-chartGreen'>4544</span>
				</span>
				<span>
					Total Downstaked: <span className='text-chartRed'>145</span>
				</span>
			</div>
			<span className='text-textSecondary font-medium text-sm'>Ends in 2 days</span>
		</div>
	);
};

export default GameCard;
