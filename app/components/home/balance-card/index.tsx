import React from 'react';
import { useBalance } from '@thirdweb-dev/react';

// Icons
import { PiAirplaneDuotone } from 'react-icons/pi';

import { TOKEN_ADDRESS } from '@/config';

const BalanceCard = () => {
	const { data } = useBalance(TOKEN_ADDRESS);

	return (
		<div className='rounded-xl bg-[#1D1D26] p-8 py-6'>
			<div className='flex flex-col gap-6'>
				<span className='text-sm text-textSecondary'>Your Balance</span>
				<div className='flex flex-row items-center gap-4'>
					<PiAirplaneDuotone className='text-5xl text-chartBlue' />
					<span className='text-5xl'>{data?.displayValue ?? 0}</span>
				</div>
			</div>
		</div>
	);
};

export default BalanceCard;
