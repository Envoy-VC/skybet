import React from 'react';
import { CustomInput, CustomDate } from '@/components/common';

const CreateGame = () => {
	return (
		<div className='max-w-3xl p-5'>
			<div className='mb-16 text-4xl font-medium'>Create Game</div>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Operator Address(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomInput
						placeholder='0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1'
						size='large'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Game Duration(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomDate />
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Staking Duration(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomDate />
				</div>
			</div>
		</div>
	);
};

export default CreateGame;
