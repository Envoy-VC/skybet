import React from 'react';
import { Table, ConfigProvider } from 'antd';
import {
	useContract,
	useContractEvents,
	useContractRead,
} from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

import { BetType } from '../place-bet/index';

const { Column } = Table;

interface DataType {
	key: React.Key;
	address: string;
	betType: number;
	value: number;
}

interface Props {
	gameId: number;
}

const LatestBetsTable = ({ gameId }: Props) => {
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: events, isLoading, error } = useContractEvents(contract);
	return (
		<div className='flex flex-col gap-4'>
			<span className='text-xl font-medium'>Latest Bets</span>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
							colorBorder: 'transparent',
							colorBgContainer: '#1D1D26',
						},
					}}
				>
					<Table
						dataSource={
							events
								?.filter(
									(event) =>
										event.eventName === 'AmountStaked' ||
										event.eventName === 'AmountUnstaked'
								)
									?.map((event, index) => {
									if(event?.data?.gameId == gameId)
									return {
										key: index,
										address: event?.data?.user,
										betType: event?.data?.betType,
										value: event?.data?.amount,
									} as DataType;
								}) || []
						}
					>
						<Column
							title='Address'
							dataIndex='address'
							key='address'
							render={(address: string, record: DataType) => (
								<span className='text-lg font-bold text-primary'>
									{address}
								</span>
							)}
						/>
						<Column
							title='Bet Type'
							dataIndex='betType'
							key='betType'
							render={(betType: number, record: DataType) => {
								if (betType === 1)
									return <span className='text-lg text-chartGreen'>Rise</span>;
								else if (betType === 0)
									return <span className='text-lg text-chartRed'>Drop</span>;
							}}
						/>
						<Column
							title='Amount'
							dataIndex='value'
							key='value'
							render={(value: number, record: DataType) => (
								<span className='text-lg font-bold'>{value / 10 ** 18}</span>
							)}
						/>
					</Table>
				</ConfigProvider>
			)}
		</div>
	);
};

export default LatestBetsTable;
