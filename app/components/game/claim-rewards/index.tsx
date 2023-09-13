import React from 'react';
import { Button, Spin } from 'antd';
import { useContract, useContractWrite } from '@thirdweb-dev/react';

import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Icons
import { PiAirplaneDuotone } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
	gameId: number;
	totalTokensStaked: number;
	totalTokensUpstaked: number;
	totalTokensDownstaked: number;
	result: number;
	betType: number;
}

const ClaimRewards = ({
	gameId,
	totalTokensStaked,
	totalTokensDownstaked,
	totalTokensUpstaked,
	result,
}: Props) => {
	const rewardAmount =
		result === 0
			? (totalTokensStaked / totalTokensDownstaked) *
			  (totalTokensUpstaked + totalTokensDownstaked)
			: (totalTokensStaked / totalTokensUpstaked) *
			  (totalTokensUpstaked + totalTokensDownstaked);

	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { mutateAsync: claim, isLoading } = useContractWrite(
		contract,
		'withdrawWinnings'
	);

	const handleClaim = async () => {
		try {
			await claim({ args: [gameId] });
		} catch (error: any) {
			console.log(error?.reason);
		}
	};

	return (
		<div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<div className='flex flex-col gap-4'>
				<span className='text-center text-3xl font-medium'>
					🎉 Congratulations
				</span>
				<div className='mt-6 rounded-xl bg-[#1a1e2e] p-8 py-6'>
					<div className='flex flex-col gap-6'>
						<span className='text-sm text-textSecondary'>
							Your estimated reward
						</span>
						<div className='flex flex-row items-center gap-4'>
							<PiAirplaneDuotone className='text-5xl text-chartBlue' />
							<span className='text-5xl'>{rewardAmount.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>
			<Button
				type='text'
				size='large'
				className='mx-auto flex w-fit items-center justify-center bg-primary !p-5 !text-xl font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
				onClick={handleClaim}
				disabled={isLoading}
			>
				{isLoading ? (
					<div className='flex flex-row items-center justify-center gap-2'>
						<Spin
							indicator={
								<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
							}
						/>
					</div>
				) : (
					'Claim'
				)}
			</Button>
		</div>
	);
};

export default ClaimRewards;
