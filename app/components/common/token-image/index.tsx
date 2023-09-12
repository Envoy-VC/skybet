import React from 'react';
import Image, { ImageProps } from 'next/image';

// Logos
import EthLogo from '@/public/eth-logo.svg';
import BTCLogo from '@/public/btc-logo.svg';
import PolkadotLogo from '@/public/dot-logo.svg';

export type TokenImageType = 'ethereum' | 'bitcoin' | 'polkadot';

interface TokenImageProps extends Partial<ImageProps> {
	tokenId: TokenImageType;
}
const TokenImage = ({ tokenId, ...props }: TokenImageProps) => {
	switch (tokenId) {
		case 'ethereum':
			return <Image src={EthLogo} alt='Ethereum Logo' {...props} />;
		case 'bitcoin':
			return <Image src={BTCLogo} alt='Bitcoin Logo' {...props} />;
		case 'polkadot':
			return <Image src={PolkadotLogo} alt='Polkadot Logo' {...props} />;
	}
};

export default TokenImage;
