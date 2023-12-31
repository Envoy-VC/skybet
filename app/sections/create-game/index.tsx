import React from 'react';
import { useRouter } from 'next/router';
import { Button, Spin } from 'antd';

import toast from 'react-hot-toast';

import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { SKYBET_ADDRESS, SKYBET_ABI } from '@/config';

import TokenDropdown from '@/components/common/custom-date/token-dropdown';
import { CustomInput, CustomDate } from '@/components/common';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

export interface CreateGameFormProps {
	operatorAddress: string;
	startAt: number;
	endAt: number;
	stakingStartAt: number;
	stakingEndAt: number;
	token: number;
}

const CreateGame = () => {
	const router = useRouter();
	const { contract } = useContract(SKYBET_ADDRESS, SKYBET_ABI);
	const { mutateAsync: createGame, isLoading } = useContractWrite(
		contract,
		'createGame'
	);
	const [createForm, setCreateForm] = React.useState<CreateGameFormProps>({
		operatorAddress: '',
		startAt: 0,
		endAt: 0,
		stakingStartAt: 0,
		stakingEndAt: 0,
		token: 0,
	});

	const create = async () => {
		const now = Math.floor(Date.now() / 1000);
		if (createForm.operatorAddress === '') {
			toast.error('Operator Address is required');
			return;
		}
		if (createForm.startAt < now) {
			toast.error('Start time should be greater than current time');
			return;
		}
		if (createForm.endAt < createForm.startAt) {
			toast.error('End time should be greater than start time');
			return;
		}
		if (createForm.endAt - createForm.startAt > 7 * 24 * 60 * 60) {
			toast.error('Game duration should be less than 7 days');
			return;
		}
		if (
			createForm.stakingStartAt <= createForm.startAt ||
			createForm.stakingStartAt > createForm.endAt ||
			createForm.stakingEndAt <= createForm.startAt ||
			createForm.stakingEndAt > createForm.endAt
		) {
			toast.error('Staking start time should be between start and end time');
			return;
		}
		try {
			await createGame({
				args: [
					createForm.operatorAddress,
					createForm.startAt,
					createForm.stakingStartAt,
					createForm.stakingEndAt,
					createForm.endAt,
					createForm.token,
				],
			});
		} catch (error: any) {
			toast.error(error?.reason);
		} finally {
			setCreateForm({
				operatorAddress: '',
				startAt: 0,
				endAt: 0,
				stakingStartAt: 0,
				stakingEndAt: 0,
				token: 0,
			});
			router.push('/');
		}
	};

	return (
		<div className='max-w-3xl p-5'>
			<div className='mb-16 text-4xl font-medium'>Create Game</div>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Operator Address(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomInput
						placeholder='0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1'
						size='large'
						onChange={(e) => {
							setCreateForm((prev) => {
								return { ...prev, operatorAddress: e.target.value };
							});
						}}
						value={createForm.operatorAddress}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Game Duration(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomDate
						onChange={(e) => {
							const start = Math.floor(
								(e?.[0]?.toDate().valueOf() || 0) / 1000
							);
							const end = Math.floor((e?.[1]?.toDate().valueOf() || 0) / 1000);
							setCreateForm((prev) => {
								return { ...prev, startAt: start, endAt: end };
							});
						}}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Staking Duration(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<CustomDate
						onChange={(e) => {
							const stakeStart = Math.floor(
								(e?.[0]?.toDate().valueOf() || 0) / 1000
							);
							const stakeEnd = Math.floor(
								(e?.[1]?.toDate().valueOf() || 0) / 1000
							);
							setCreateForm((prev) => {
								return {
									...prev,
									stakingStartAt: stakeStart,
									stakingEndAt: stakeEnd,
								};
							});
						}}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg text-textSecondary'>
							Token(<span className='text-chartRed'>*</span>)
						</span>
					</div>
					<TokenDropdown
						createForm={createForm}
						setCreateForm={setCreateForm}
					/>
				</div>
				<Button
					type='text'
					size='large'
					className='my-8 max-w-xs bg-primary font-medium text-white hover:!bg-[rgba(108,97,208,0.75)] hover:!text-white'
					onClick={create}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className='flex flex-row items-center justify-center gap-2'>
							<Spin
								indicator={
									<LoadingOutlined
										style={{ fontSize: 20, color: '#fff' }}
										spin
									/>
								}
							/>
						</div>
					) : (
						'Create'
					)}
				</Button>
			</div>
		</div>
	);
};

export default CreateGame;
