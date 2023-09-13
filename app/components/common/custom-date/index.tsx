import React from 'react';
import {
	DatePicker,
	ConfigProvider,
	TimeRangePickerProps,
	DatePickerProps,
} from 'antd';

const { RangePicker } = DatePicker;

interface CustomDateProps extends TimeRangePickerProps {}

const CustomDate = ({ ...props }: CustomDateProps) => {
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
			<RangePicker showTime {...props} />
		</ConfigProvider>
	);
};

export default CustomDate;
