import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum } from '@thirdweb-dev/chains';

import { ConfigProvider, theme } from 'antd';

import { SEO } from '..';
import { TW_CLIENT_ID } from '@/config';

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
			<ThirdwebProvider activeChain={Ethereum} clientId={TW_CLIENT_ID}>
				<>
					<SEO />
					{children}
				</>
			</ThirdwebProvider>
		</ConfigProvider>
	);
};

export default Layout;
