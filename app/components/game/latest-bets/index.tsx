import React from 'react';
import { Table, ConfigProvider } from 'antd';
import { BetType } from '../place-bet/index';

const { Column } = Table;

interface DataType {
	key: React.Key;
	address: string;
	betType: BetType;
	value: number;
	time: number;
}

const data: DataType[] = [
	{
		key: '1',
		address: 'John',
		betType: 'rise',
		value: 100,
		time: 15888888888,
	},
	{
		key: '2',
		address: 'Shaw',
		betType: 'drop',
		value: 782,
		time: 15888888888,
	},
	{
		key: '3',
		address: 'Vedant',
		betType: 'rise',
		value: 4555,
		time: 15888888888,
	},
	{
		key: '4',
		address: 'Alex',
		betType: 'drop',
		value: 88891,
		time: 15888888888,
	},
];

const LatestBetsTable = () => {
	return (
		<div className='flex flex-col gap-4'>
			<span className='text-xl font-medium'>Latest Bets</span>
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
				<Table dataSource={data}>
					<Column title='Address' dataIndex='address' key='firstName' />
					<Column
						title='Bet Type'
						dataIndex='betType'
						key='betType'
						render={(betType: BetType, record: DataType) => {
							if (betType === 'rise')
								return <span className='text-chartGreen text-lg'>Rise</span>;
							else if (betType === 'drop')
								return <span className='text-chartRed text-lg'>Drop</span>;
						}}
					/>
					<Column title='Amount' dataIndex='value' key='value' />

					<Column
						title='Time'
						key='time'
						render={(time: number, record: DataType) =>
							// format timestamp in format of Sep 12, 12:35 AM
							new Date(record.time).toLocaleString()
						}
					/>
				</Table>
			</ConfigProvider>
		</div>
	);
};

export default LatestBetsTable;
