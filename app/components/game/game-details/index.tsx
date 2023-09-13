import React from 'react';
import { Button } from 'antd';
import { TokenImage } from '@/components/common';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

interface Props {
	gameId: number;
	totalUpstaked: number;
	totalDownstaked: number;
	isEnded: boolean;
	operatorAddress: string;
	endAt: number;
	stakingStartAt: number;
	stakingEndAt: number;
}

const GameDetails = ({
	gameId,
	totalUpstaked,
	totalDownstaked,
	isEnded,
	operatorAddress,
	endAt,
	stakingStartAt,
	stakingEndAt,
}: Props) => {
	const address = useAddress();
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { mutateAsync: declareResult } = useContractWrite(
		contract,
		'declareResult'
	);

	const declare = async () => {
		try {
			await declareResult({
				args: [gameId],
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col justify-between gap-4 md:flex-row md:items-start'>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-row items-center gap-3'>
					<TokenImage tokenId='ethereum' width={24} />
					<div className='text-3xl font-medium'>Game #{gameId}</div>
				</div>
				<div className='flex flex-col'>
					<div className='mb-4 flex flex-row items-center gap-4'>
						<div className='flex w-fit flex-col justify-start gap-2 rounded-xl bg-[#1D1D26] p-4 pr-8 text-xl text-chartGreen'>
							<div className='text-sm text-textSecondary'>Upstake</div>
							{totalUpstaked}
						</div>
						<div className='flex w-fit flex-col justify-start gap-2 rounded-xl bg-[#1D1D26] p-4 pr-8 text-xl text-chartRed'>
							<div className='text-sm text-textSecondary'>Downstake</div>
							{totalDownstaked}
						</div>
					</div>

					<span className=' text-textSecondary'>
						Staking start at:{' '}
						<span className='text-primary'>
							{new Date(stakingStartAt * 1000).toLocaleString()}
						</span>
					</span>
					<span className=' text-textSecondary'>
						Staking end at:{' '}
						<span className='text-primary'>
							{new Date(stakingEndAt * 1000).toLocaleString()}
						</span>
					</span>
				</div>
			</div>
			{address === operatorAddress && isEnded && (
				<Button
					type='text'
					className='bg-primary text-xl text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
					size='large'
					onClick={declare}
				>
					Declare Result
				</Button>
			)}
		</div>
	);
};

export default GameDetails;
