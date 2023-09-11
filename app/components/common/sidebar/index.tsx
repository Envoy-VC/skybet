import React from 'react';
import Link from 'next/link';

// Icons
import {
	PiRainbowCloudBold,
	PiCirclesFour,
	PiChartLineUp,
	PiCurrencyCircleDollar,
	PiWallet,
	PiGearSix,
} from 'react-icons/pi';

// Types
import { IconType } from 'react-icons';
import { Button } from 'antd';

interface SidebarItemProps {
	Icon: IconType;
	label: string;
	handleClick?: () => void;
}

const SidebarItem = ({ Icon, label, handleClick }: SidebarItemProps) => {
	return (
		<Button
			className='flex w-fit flex-row items-center justify-start gap-3'
			type='text'
			size='large'
		>
			<Icon className='' size={24} />
			<div className='hidden text-lg xl:flex'>{label}</div>
		</Button>
	);
};

const Sidebar = () => {
	const SidebarItems: SidebarItemProps[] = [
		{
			Icon: PiCirclesFour,
			label: 'Dashboard',
		},
		{
			Icon: PiChartLineUp,
			label: 'Games',
		},
		{
			Icon: PiCurrencyCircleDollar,
			label: 'My Bets',
		},
		{
			Icon: PiWallet,
			label: 'Wallet',
		},
		{
			Icon: PiGearSix,
			label: 'Settings',
		},
	];
	return (
		<div className='min-h-screen w-full max-w-fit p-4 py-8 xl:max-w-[16rem]'>
			<div className='flex flex-col gap-12'>
				<Link className='mx-4 flex flex-row items-center gap-2' href='/'>
					<PiRainbowCloudBold className='text-chartGreen' size={36} />
					<span className='hidden w-fit text-2xl font-semibold xl:flex'>
						Skybet
					</span>
				</Link>
				<div className='flex flex-col gap-3'>
					{SidebarItems.map((item, index) => (
						<SidebarItem {...item} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
