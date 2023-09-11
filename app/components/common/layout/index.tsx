import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum } from '@thirdweb-dev/chains';

import { ConfigProvider, theme } from 'antd';

import { Navbar, SEO, Sidebar } from '..';
import { TW_CLIENT_ID, AppMetadata } from '@/config';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					colorPrimary: '#6C61D0',
				},
			}}
		>
			<ThirdwebProvider
				activeChain={Ethereum}
				clientId={TW_CLIENT_ID}
				dAppMeta={AppMetadata}
			>
				<>
					<SEO />
					<div className={`flex flex-row ${inter.className}`}>
						<Sidebar />
						<div className='flex w-full flex-col'>
							<Navbar />
							{children}
						</div>
					</div>
				</>
			</ThirdwebProvider>
		</ConfigProvider>
	);
};

export default Layout;
