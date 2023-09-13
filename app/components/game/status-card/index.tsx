import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';

interface Props extends IconBaseProps {
	text: string;
	Icon: IconType;
}

const StatusCard = ({ text, Icon, ...props }: Props) => {
	return (
		<div className='flex h-full flex-col justify-center gap-16 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='text-center text-4xl'>{text}</span>
			<Icon className='mx-auto text-textSecondary' size={128} />
		</div>
	);
};

export default StatusCard;
