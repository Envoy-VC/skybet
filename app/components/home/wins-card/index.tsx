import React from 'react';
import { Skeleton } from 'antd';
import { useContract, useContractEvents } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

const WinsCard = () => {
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: wins, isLoading } = useContractEvents(
		contract,
		'WithdrawWinnings'
	);
	return (
		<div className='rounded-xl bg-[#1D1D26] p-8 py-6 h-full'>
			<div className='flex flex-col gap-6'>
				<span className='text-sm text-textSecondary'>Wins</span>
				<span className='text-5xl'>
					{isLoading ? (
						<Skeleton.Node active>
							<div />
						</Skeleton.Node>
					) : (
						wins?.length
					)}
				</span>
			</div>
		</div>
	);
};

export default WinsCard;
