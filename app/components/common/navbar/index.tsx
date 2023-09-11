import React from 'react';
import Link from 'next/link';
import { Avatar, ConfigProvider, Input } from 'antd';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';

// Icons
import {
	PiRainbowCloudBold,
	PiMagnifyingGlassBold,
	PiChatTeardropDots,
	PiBell,
} from 'react-icons/pi';

const Navbar = () => {
	const address = useAddress();
	return (
		<div className='w-full p-6'>
			<div className='flex flex-row items-center justify-between sm:justify-end lg:justify-between'>
				<Link
					className='mx-2 flex flex-row items-center gap-2 sm:hidden xl:mx-4'
					href='/'
				>
					<PiRainbowCloudBold className='text-chartGreen' size={36} />
					<span className='flex w-fit text-2xl font-semibold'>Skybet</span>
				</Link>
				<ConfigProvider
					theme={{
						token: {
							controlOutline: 'none',
							colorPrimaryHover: 'none',
							colorBgBase: '#1D1D26',
						},
					}}
				>
					<Input
						placeholder='Search'
						prefix={<PiMagnifyingGlassBold size={20} color='#fff' />}
						size='middle'
						className='hidden max-w-[28rem] flex-row items-center gap-4 rounded-3xl px-0 py-2 font-medium lg:flex'
					/>
				</ConfigProvider>
				<div className='flex flex-row items-center gap-3'>
					<PiChatTeardropDots
						size={24}
						color='#fff'
						className='hidden xl:flex'
					/>
					<PiBell size={24} color='#fff' className='hidden xl:flex' />
					<ConnectWallet
						className='!bg-primary !w-fit !p-[10px] !px-4 !text-white'
						btnTitle='Connect'
						detailsBtn={() => (
							<div className='flex cursor-pointer flex-row items-center'>
								<div className='rounded-l-xl bg-[#1D1D26] px-3 py-2 text-sm font-medium text-[#69697C]'>
									{(address || '').slice(0, 4) +
										'...' +
										(address || '').slice(-4)}
								</div>
								<Avatar
									src={`https://api.dicebear.com/7.x/personas/svg?seed=${address}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=110`}
									size={46}
									className='!z-[100] -translate-x-1'
								/>
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
