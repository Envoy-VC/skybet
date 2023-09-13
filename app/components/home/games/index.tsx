import React from 'react';
import { ConfigProvider, Menu, Spin } from 'antd';
import { useContract, useContractRead } from '@thirdweb-dev/react';

import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Components
import GameCard from '../game-card';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

// Types
import type { MenuProps } from 'antd';
export type MenuItemType = 'all' | 'active' | 'ended';

interface MenuItemProps {
	id: string;
	label: string;
	handleClick?: () => void;
}

const items: MenuItemProps[] = [
	{ id: 'all', label: 'All Games' },
	{ id: 'active', label: 'Active Games' },
	{ id: 'ended', label: 'Ended Games' },
];

const MenuItem = ({ label, handleClick }: MenuItemProps) => {
	return (
		<div
			className='rounded-t-lg px-5 font-medium  hover:bg-[#6c61d027]'
			onClick={handleClick}
		>
			{label}
		</div>
	);
};

const Games = () => {
	const [activeMenuItem, setActiveMenuItem] =
		React.useState<MenuItemType>('all');

	const onClick: MenuProps['onClick'] = (e) => {
		setActiveMenuItem(e.key as MenuItemType);
	};

	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: totalGames, isLoading } = useContractRead(
		contract,
		'gameCount'
	);

	return (
		<div className='rounded-xl bg-[#1D1D26] p-4 lg:p-8 lg:py-6'>
			<div className='flex flex-col gap-4'>
				<ConfigProvider
					theme={{
						token: {
							fontWeightStrong: 800,
							colorBgBase: '#1D1D26',
							controlOutline: 'none',
							borderRadiusLG: 24,
							colorPrimary: '#6C61D0',
						},
						components: {
							Menu: {
								fontSize: 16,
								itemPaddingInline: 1,
							},
						},
					}}
				>
					<Menu
						onClick={onClick}
						selectedKeys={[activeMenuItem]}
						defaultSelectedKeys={['all']}
						mode='horizontal'
						items={items.map((item, index) => {
							return {
								key: item.label.toLowerCase(),
								label: <MenuItem key={index} {...item} />,
							};
						})}
						style={{ flex: 'auto', minWidth: 0 }}
						className='rounded-xl'
					/>
				</ConfigProvider>
				<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
					{isLoading ? (
						<div className='mx-auto p-5'>
							<Spin
								indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
							/>
						</div>
					) : (
						<>
							{Array(parseInt(totalGames?.toString()))
								.fill(5)
								.map((_, index) => (
									<GameCard key={index} gameId={index} />
								))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Games;
