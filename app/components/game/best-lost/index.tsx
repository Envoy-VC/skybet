import React from 'react';
import { PiSmileySad } from 'react-icons/pi';

const BestLost = () => {
	return (
		<div className='flex h-full flex-col justify-center gap-16 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='text-center text-4xl'>Better luck next time...</span>
			<PiSmileySad className='text-textSecondary mx-auto' size={128} />
		</div>
	);
};

export default BestLost;
