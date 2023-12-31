import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Polygon, Mumbai } from '@thirdweb-dev/chains';

import { Toaster } from 'react-hot-toast';

import { ConfigProvider, theme } from 'antd';

import { SEO } from '..';
import { TW_CLIENT_ID, ENV } from '@/config';

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
				activeChain={ENV === 'production' ? Polygon : Mumbai}
				supportedChains={ENV === 'production' ? [Polygon] : [Mumbai]}
				clientId={TW_CLIENT_ID}
			>
				<>
					<SEO />
					{children}
					<Toaster position='bottom-left' />
				</>
			</ThirdwebProvider>
		</ConfigProvider>
	);
};

export default Layout;
