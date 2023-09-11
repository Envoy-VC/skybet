import React from 'react';
import { Button } from 'antd';

// Icons
import { PiAirplaneDuotone } from 'react-icons/pi';

const ClaimRewards = () => {
	return (
		<div className='flex h-full flex-col gap-4 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='text-center text-3xl font-medium'>
				🎉 Congrats on winning
			</span>
			<div className='mt-6 rounded-xl bg-[#1a1e2e] p-8 py-6'>
				<div className='flex flex-col gap-6'>
					<span className='text-textSecondary text-sm'>Estimated Rewards</span>
					<div className='flex flex-row items-center gap-4'>
						<PiAirplaneDuotone className='text-chartBlue text-5xl' />
						<span className='text-5xl'>6254</span>
					</div>
				</div>
			</div>
			<Button
				type='text'
				size='large'
				className='bg-primary mx-auto mt-8 flex w-fit items-center justify-center !p-6 !text-2xl font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
			>
				Claim
			</Button>
		</div>
	);
};

export default ClaimRewards;
