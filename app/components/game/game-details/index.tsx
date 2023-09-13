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
}

const GameDetails = ({
	gameId,
	totalUpstaked,
    totalDownstaked,
    isEnded,
	operatorAddress,
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
		<div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-row items-center gap-3'>
					<TokenImage tokenId='ethereum' width={24} />
					<div className='text-3xl font-medium'>Game #{gameId}</div>
				</div>
				<div className='flex flex-col'>
					<span className='text-lg text-textSecondary'>
						Total amount upstaked:{' '}
						<span className='text-chartGreen'>{totalUpstaked}</span>
					</span>
					<span className='text-lg text-textSecondary'>
						Total amount downstaked:{' '}
						<span className='text-chartRed'>{totalDownstaked}</span>
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
