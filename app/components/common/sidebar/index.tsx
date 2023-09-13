import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
			className='flex w-fit flex-row items-center justify-center gap-3 !px-[6px] xl:justify-start'
			type='text'
			size='large'
			onClick={handleClick}
		>
			<Icon size={24} />
			<div className='hidden text-lg xl:flex '>{label}</div>
		</Button>
	);
};

const Sidebar = () => {
	const router = useRouter();
	const SidebarItems: SidebarItemProps[] = [
		{
			Icon: PiCirclesFour,
			label: 'Dashboard',
			handleClick: () => router.push('/'),
		},
		{
			Icon: PiChartLineUp,
			label: 'Create  Game',
			handleClick: () => router.push('/create'),
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
		<div className='hidden min-h-screen w-full max-w-fit border-r-2 border-[#383A44] p-4 py-8 sm:flex xl:max-w-[16rem]'>
			<div className='flex flex-col items-center gap-12 lg:items-start'>
				<Link
					className='mx-2 flex flex-row items-center gap-2 xl:mx-4'
					href='/'
				>
					<PiRainbowCloudBold className='text-chartGreen' size={36} />
					<span className='hidden w-fit text-2xl font-semibold xl:flex'>
						Skybet
					</span>
				</Link>
				<div className='flex w-full flex-col gap-3'>
					{SidebarItems.map((item, index) => (
						<SidebarItem {...item} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
