import React from 'react';
import { useAddress } from '@thirdweb-dev/react';

import { Navbar, Sidebar } from '../..';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const address = useAddress();
	if (!!address)
		return (
			<div className={`flex flex-row ${inter.className}`}>
				<Sidebar />
				<div className='flex w-full flex-col'>
					<Navbar />
					{children}
				</div>
			</div>
		);
	else {
		return (
			<div className={`flex flex-row ${inter.className}`}>
				<Sidebar />
				<div className='flex w-full flex-col'>
					<Navbar />
					<div className='p-8 text-center text-xl'>Connect your wallet</div>
				</div>
			</div>
		);
	}
};

export default NestedLayout;
