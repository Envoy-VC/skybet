import React from 'react';
import Image from 'next/image';
import EthLogo from '@/public/eth-logo.svg';

interface TransactionPillProps {
	gameId: number;
	address: string;
	type: 'up' | 'down';
	currency: string;
	value: number;
	timestamp: number;
}

const TransactionPill = ({
	gameId,
	address,
	type,
	currency,
	value,
	timestamp,
}: TransactionPillProps) => {
	return (
		<div className='border-textSecondary flex flex-row items-center justify-between gap-4 rounded-lg border-[1px] p-3 px-4'>
			<div className='flex flex-row gap-4'>
				<Image alt='coin-logo' src={EthLogo} width={20} />
				<div className='flex h-full flex-col'>
					<span>
						<span className='text-primary font-medium'>0xBf4...d3e1</span> for
						Game #1
					</span>
					<span className='text-textSecondary text-sm font-medium'>
						12:30 Sep 10, 2023
					</span>
				</div>
			</div>
			<div className='text-chartGreen text-xl font-bold'>+345</div>
		</div>
	);
};

const Transactions = () => {
	return (
		<div className='flex h-full flex-col gap-4 rounded-xl bg-[#1D1D26] p-8 py-6'>
			<span className='mb-4 text-xl font-medium'>Latest Transactions</span>
			<div className='flex flex-col gap-2'>
				{Array(5)
					.fill(1)
					.map((_, index) => (
						<TransactionPill
							key={index}
							gameId={1}
							address='0xBf4...lk4'
							type='up'
							currency='ETH'
							value={345}
							timestamp={1234567890}
						/>
					))}
			</div>
		</div>
	);
};

export default Transactions;
