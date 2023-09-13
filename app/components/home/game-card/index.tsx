import React from 'react';
import { useRouter } from 'next/router';
import { useContract, useContractRead } from '@thirdweb-dev/react';

import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';
import { TokenImage } from '@/components/common';
import { formatTimestamp } from '@/utils';

interface Props {
	gameId: number;
}

const GameCard = ({ gameId }: Props) => {
	const router = useRouter();
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: game } = useContractRead(contract, 'Games', [gameId]);

	if (!!game)
		return (
			<div
				className='flex cursor-pointer flex-col gap-3 rounded-xl bg-[#161925] p-4'
				onClick={() => router.push(`/games/${gameId}`)}
			>
				<div className='flex flex-row items-center gap-4'>
					<TokenImage tokenId={game?.token?.at(0)} width={24} />
					<span className='text-xl font-semibold'>Game #{gameId}</span>
				</div>
				<div className='flex flex-col gap-1 text-[0.9rem]'>
					<span>
						Total Upstaked:{' '}
						<span className='text-chartGreen'>
							{game?.totalAmountUpstaked?.toString() / 10 ** 18 ?? 0}
						</span>
					</span>
					<span>
						Total Downstaked:{' '}
						<span className='text-chartRed'>
							{game?.totalAmountDownstaked?.toString() / 10 ** 18 ?? 0}
						</span>
					</span>
				</div>
				<span className='text-sm font-medium text-textSecondary'>
					Ends in {formatTimestamp(game?.endAt?.toString() ?? 0)}
				</span>
			</div>
		);
};

export default GameCard;
