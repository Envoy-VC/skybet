import React from 'react';
import { Input, ConfigProvider } from 'antd';

import { InputProps } from 'antd';

interface Props extends InputProps {}

const CustomInput = ({ ...props }: Props) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					controlOutline: 'none',
					colorPrimaryHover: 'none',
					colorBorder: 'transparent',
					colorBgContainer: '#35353B',
				},
			}}
		>
			<Input {...props} />
		</ConfigProvider>
	);
};

export default CustomInput;
