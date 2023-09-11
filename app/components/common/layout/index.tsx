import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum } from '@thirdweb-dev/chains';

import { ConfigProvider, theme } from 'antd';

import { SEO } from '..';
import { TW_CLIENT_ID, AppMetadata } from '@/config';

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
			}}
		>
			<ThirdwebProvider
				activeChain={Ethereum}
				clientId={TW_CLIENT_ID}
				dAppMeta={AppMetadata}
			>
				<>
					<SEO />
					layout
					{children}
				</>
			</ThirdwebProvider>
		</ConfigProvider>
	);
};

export default Layout;
