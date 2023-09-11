import React from 'react';

import { BalanceCard, Games, WinsCard } from '@/components/home';

const Home = () => {
	return (
		<div className='flex flex-col gap-8 p-4 py-8'>
			<span className='text-3xl font-medium'>Dashboard</span>

			<div className='flex flex-col gap-8 lg:flex-row'>
				<div className='w-full basis-2/3'>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-col gap-4 lg:flex-row'>
							<div className='w-full basis-3/4'>
								<BalanceCard />
							</div>
							<div className='w-full basis-1/4'>
								<WinsCard />
							</div>
						</div>
						<Games />
					</div>
				</div>
				<div className='w-full basis-1/3'>aa</div>
			</div>
		</div>
	);
};

export default Home;
