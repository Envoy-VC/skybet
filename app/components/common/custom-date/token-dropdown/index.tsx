import React from 'react';
import { Select } from 'antd';
import { TokenImage } from '../..';

interface TokenItemProps {
	value: string;
	label: string;
}
const TokenItem = ({ value, label }: TokenItemProps) => {
	return (
		<div className='flex flex-row items-center justify-start gap-2'>
			<TokenImage tokenId={value as any} width={16} />
			<span className='font-medium'>{label}</span>
		</div>
	);
};

import { CreateGameFormProps } from '@/sections/create-game';

interface Props {
	createForm: CreateGameFormProps;
	setCreateForm: React.Dispatch<React.SetStateAction<CreateGameFormProps>>;
}

const TokenDropdown = ({ createForm, setCreateForm }: Props) => {
	const Tokens = [
		{
			value: '0',
			label: <TokenItem value='ethereum' label='Ethereum' />,
		},
		{
			value: '1',
			label: <TokenItem value='bitcoin' label='Bitcoin' />,
		},
		{
			value: '2',
			label: <TokenItem value='polkadot' label='Polkadot' />,
		},
	];
	return (
		<Select
			defaultValue='0'
			style={{ width: 120 }}
			options={Tokens}
			size='large'
			onChange={(e) => {
				setCreateForm((prev) => {
					return { ...prev, token: parseInt(e) };
				});
			}}
		/>
	);
};

export default TokenDropdown;
