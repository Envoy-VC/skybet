import React from 'react';
import { PiHourglassMedium } from 'react-icons/pi';

const NoResults = () => {
	return (
		<div className='flex h-full flex-col justify-center gap-16 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='text-center text-4xl'>
				Waiting for results to be declared
			</span>
			<PiHourglassMedium className='text-textSecondary mx-auto' size={128} />
		</div>
	);
};

export default NoResults;
