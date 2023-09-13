import React from 'react';
import {
	useContract,
	useContractEvents,
	useContractRead,
} from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

import { TokenImage } from '@/components/common';
import { TokenImageType } from '@/components/common/token-image';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface TransactionPillProps {
	gameId: number;
	address: string;
	type: number;
	value: number;
}

const TransactionPill = ({
	gameId,
	address,
	type,
	value,
}: TransactionPillProps) => {
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const {
		data: game,
		isLoading,
		error,
	} = useContractRead(contract, 'Games', [gameId]);
	if (isLoading) return <div></div>;
	else
		return (
			<div className='flex flex-row items-center justify-between gap-4 rounded-lg border-[1px] border-textSecondary p-3 px-4'>
				<div className='flex flex-row gap-4'>
					<TokenImage
						tokenId={game?.token?.toString() as TokenImageType}
						width={20}
					/>
					<div className='flex h-full flex-col'>
						<span>
							<span className='font-medium text-primary'>
								{address?.slice(0, 4) + '...' + address?.slice(-4)}
							</span>{' '}
							for Game #{gameId}
						</span>
					</div>
				</div>
				<div
					className={`text-xl font-bold ${
						type === 0 ? 'text-chartRed ' : 'text-chartGreen '
					}`}
				>
					{type === 0 ? `-${value / 10 ** 18}` : `+${value / 10 ** 18}`}
				</div>
			</div>
		);
};

const Transactions = () => {
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: events, isLoading, error } = useContractEvents(contract);

	return (
		<div className='flex h-full flex-col gap-4 rounded-xl bg-[#1D1D26] p-8 py-6'>
			<span className='mb-4 text-xl font-medium'>Latest Transactions</span>
			{isLoading ? (
				<div className='mx-auto p-5'>
					<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
				</div>
			) : (
				<div className='flex flex-col gap-2'>
					{events
						?.filter(
							(event) =>
								event.eventName === 'AmountStaked' ||
								event.eventName === 'AmountUnstaked'
						)
						?.map((event, index) => (
							<TransactionPill
								key={index}
								gameId={event?.data?.gameId?.toString()}
								address={event?.data?.user}
								type={parseInt(event?.data?.betType?.toString())}
								value={event?.data?.amount?.toString()}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default Transactions;
