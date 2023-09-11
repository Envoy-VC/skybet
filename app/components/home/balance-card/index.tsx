import React from 'react';
import { PiAirplaneDuotone } from 'react-icons/pi';

const BalanceCard = () => {
	return (
		<div className='rounded-xl bg-[#1D1D26] p-8 py-6'>
			<div className='flex flex-col gap-6'>
				<span className='text-textSecondary text-sm'>Your Balance</span>
				<div className='flex flex-row items-center gap-4'>
					<PiAirplaneDuotone className='text-chartBlue text-5xl' />
					<span className='text-5xl'>6254</span>
				</div>
			</div>
		</div>
	);
};

export default BalanceCard;
