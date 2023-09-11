import React from 'react';
import { CustomInput } from '@/components/common';
import { Button, Select, ConfigProvider } from 'antd';

// Icons
import { PiAirplaneDuotone } from 'react-icons/pi';

// Types
export type BetType = 'rise' | 'drop';

const PlaceBet = () => {
	const [betType, setBetType] = React.useState<BetType>('rise');

	const handleChange = (value: string) => {
		setBetType(value as BetType);
	};
	return (
		<div className='flex h-full flex-col gap-4 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='mb-4 text-2xl'>Place Bet</span>
			<div className='flex flex-col gap-3'>
				<div className='text-textSecondary flex flex-row justify-between text-xs font-medium'>
					<span>Amount</span>
					<span>245.36</span>
				</div>
				<CustomInput
					size='large'
					prefix={<PiAirplaneDuotone className='text-chartBlue text-2xl' />}
					suffix={
						<div className='flex flex-row items-center gap-2'>
							<Button
								type='text'
								className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
							>
								2X
							</Button>
							<Button
								type='text'
								className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
							>
								MAX
							</Button>
						</div>
					}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='text-textSecondary flex flex-row justify-between text-xs font-medium'>
					<span>Bet type</span>
				</div>
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
							colorBorder: 'transparent',
							colorBgContainer: '#35353B',
						},
					}}
				>
					<Select
						defaultValue='rise'
						value={betType}
						size='large'
						onChange={handleChange}
						options={[
							{ value: 'rise', label: 'Rise' },
							{ value: 'drop', label: 'Drop' },
						]}
					/>
				</ConfigProvider>
			</div>
			<Button
				type='text'
				size='large'
				className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
			>
				Place bet
			</Button>
			<div className='mt-6 rounded-xl bg-[#1a1e2e] p-8 py-6'>
				<div className='flex flex-col gap-6'>
					<span className='text-textSecondary text-sm'>Total Staked</span>
					<div className='flex flex-row items-center gap-4'>
						<PiAirplaneDuotone className='text-chartBlue text-5xl' />
						<span className='text-chartGreen text-5xl'>6254</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceBet;
