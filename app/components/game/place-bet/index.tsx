import React from 'react';
import { CustomInput } from '@/components/common';
import { Button, Select, ConfigProvider, Spin } from 'antd';

import toast from 'react-hot-toast';

import { ethers } from 'ethers';
import {
	useAddress,
	useBalance,
	useContract,
	useContractWrite,
	useContractRead,
} from '@thirdweb-dev/react';
import { TOKEN_ADDRESS, TOKEN_ABI, SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

// Icons
import { PiAirplaneDuotone } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

// Types
export type BetType = 'rise' | 'drop';

interface Props {
	gameId: number;
	BetType: number;
	totalStaked: number;
}

const PlaceBet = ({ BetType, totalStaked, gameId }: Props) => {
	const address = useAddress();
	const { data: balance } = useBalance(TOKEN_ADDRESS);
	const { contract: tokenContract } = useContract(TOKEN_ADDRESS, TOKEN_ABI);
	const { contract: skybetContract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { data: allowance } = useContractRead(tokenContract, 'allowance', [
		address!,
		SKYBET_ADDRESS,
	]);
	const { mutateAsync: approve, isLoading: isApproveLoading } =
		useContractWrite(tokenContract, 'approve');
	const { mutateAsync: place, isLoading } = useContractWrite(
		skybetContract,
		'addStake'
	);

	const [bet, setBet] = React.useState<string>('0');
	const [betType, setBetType] = React.useState<BetType>('rise');

	const handleChange = (value: string) => {
		setBetType(value as BetType);
	};

	const placeBet = async () => {
		if (parseInt(bet) === 0) {
			toast.error('Amount should be greater than zero');
			return;
		}
		if (parseInt(bet) > parseInt(balance?.displayValue!)) {
			toast.error('Not Enough Tokens');
			return;
		}

		if (((allowance?.toString() as number) / 10 ** 18)! < parseInt(bet)) {
			const requestingAllowance = toast.loading(
				'Not Enough Allowance, requesting tokens...'
			);
			let requiredAllowance = (parseInt(
				ethers.utils.parseEther(bet).toString()
			) - allowance?.toString()) as number;
			try {
				await approve({
					args: [
						SKYBET_ADDRESS,
						ethers.utils.parseEther((requiredAllowance / 10 ** 18).toString()),
					],
				});
			} catch (error: any) {
				toast.error(error?.reason);
			} finally {
				toast.dismiss(requestingAllowance);
			}
			return;
		}
		try {
			const stakeType = betType === 'rise' ? 1 : 0;
			await place({
				args: [gameId, stakeType, ethers.utils.parseEther(bet)],
			});
		} catch (error: any) {
			toast.error(error?.reason);
		} finally {
			setBet('0');
		}
	};
	return (
		<div className='flex h-full flex-col gap-4 rounded-xl bg-[#1D1D26] p-5 py-6'>
			<span className='mb-4 text-2xl'>Place Bet</span>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row justify-between text-xs font-medium text-textSecondary'>
					<span>Amount</span>
					<span>{balance?.displayValue}</span>
				</div>
				<CustomInput
					size='large'
					type='number'
					prefix={<PiAirplaneDuotone className='text-2xl text-chartBlue' />}
					suffix={
						<div className='flex flex-row items-center gap-2'>
							<Button
								type='text'
								className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
								onClick={() =>
									setBet((prev) => (parseInt(prev) * 2).toString())
								}
							>
								2X
							</Button>
							<Button
								type='text'
								className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
								onClick={() => setBet(balance?.displayValue || '0')}
							>
								MAX
							</Button>
						</div>
					}
					className='flex flex-row items-center gap-2'
					value={bet}
					onChange={(e) => setBet(e.target.value)}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-row justify-between text-xs font-medium text-textSecondary'>
					<span>Bet type</span>
				</div>
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
					<Select
						defaultValue='rise'
						value={betType}
						size='large'
						onChange={handleChange}
						options={[
							{ value: 'rise', label: 'Rise' },
							{ value: 'drop', label: 'Drop' },
						]}
					/>
				</ConfigProvider>
			</div>
			<Button
				type='text'
				size='large'
				className='bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
				onClick={placeBet}
				disabled={isApproveLoading || isLoading}
			>
				{isApproveLoading || isLoading ? (
					<div className='flex flex-row items-center justify-center gap-2'>
						<Spin
							indicator={
								<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
							}
						/>
					</div>
				) : (
					'Place bet'
				)}
			</Button>
			<div className='mt-6 rounded-xl bg-[#1a1e2e] p-8 py-6'>
				<div className='flex flex-col gap-6'>
					<span className='text-sm text-textSecondary'>Total Staked</span>
					<div className='flex flex-row items-center gap-4'>
						<PiAirplaneDuotone className='text-5xl text-chartBlue' />
						<span
							className={`text-5xl ${
								BetType === 1 ? 'text-chartGreen' : 'text-chartRed'
							}`}
						>
							{totalStaked}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceBet;
