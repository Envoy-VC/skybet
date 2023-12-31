import React from 'react';
import { Table, ConfigProvider, Spin } from 'antd';
import { useContract, useContractEvents } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

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
				<div className='p-4'>
					<Spin
						indicator={
							<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />
						}
					/>
				</div>
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
						dataSource={events
							?.filter(
								(event) =>
									(event.eventName === 'AmountStaked' ||
										event.eventName === 'AmountUnstaked') &&
									event?.data?.gameId == gameId
							)
							?.map((event, index) => {
								return {
									key: index,
									address: event?.data?.user,
									betType: event?.data?.betType,
									value: event?.data?.amount,
								};
							})}
					>
						<Column
							title='Address'
							dataIndex='address'
							key='address'
							render={(address: string, record: DataType) => (
								<>
									<div className='hidden text-lg font-bold text-primary sm:flex'>
										{address}
									</div>
									<div className='flex font-bold text-primary sm:hidden'>
										{address.slice(0, 4) + '...' + address.slice(-4)}
									</div>
								</>
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
