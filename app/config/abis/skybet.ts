export const SKYBET_ABI = [
	{
		type: 'constructor',
		name: '',
		inputs: [
			{
				type: 'address',
				name: '_stakeToken',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'error',
		name: 'BadAttestor',
		inputs: [],
		outputs: [],
	},
	{
		type: 'error',
		name: 'BadCondLen',
		inputs: [
			{
				type: 'uint256',
				name: 'kenLen',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'valueLen',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'BadUpdateLen',
		inputs: [
			{
				type: 'uint256',
				name: 'kenLen',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'valueLen',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'CannotDecodeAction',
		inputs: [
			{
				type: 'uint8',
				name: 'actionId',
				internalType: 'uint8',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'CondNotMet',
		inputs: [
			{
				type: 'bytes',
				name: 'cond',
				internalType: 'bytes',
			},
			{
				type: 'uint32',
				name: 'expected',
				internalType: 'uint32',
			},
			{
				type: 'uint32',
				name: 'actual',
				internalType: 'uint32',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'Internal_toUint32Strict_outOfBounds',
		inputs: [
			{
				type: 'bytes',
				name: 'data',
				internalType: 'bytes',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'InvalidPopTarget',
		inputs: [
			{
				type: 'uint256',
				name: 'targetIdx',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'tailIdx',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'MetaTxSignatureNotMatch',
		inputs: [],
		outputs: [],
	},
	{
		type: 'error',
		name: 'NonceTooLow',
		inputs: [
			{
				type: 'uint256',
				name: 'actual',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'currentNonce',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'UnsupportedAction',
		inputs: [
			{
				type: 'uint8',
				name: 'actionId',
				internalType: 'uint8',
			},
		],
		outputs: [],
	},
	{
		type: 'event',
		name: 'AmountStaked',
		inputs: [
			{
				type: 'address',
				name: 'user',
				indexed: false,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint8',
				name: 'betType',
				indexed: false,
				internalType: 'enum Skybet.Outcome',
			},
			{
				type: 'uint256',
				name: 'amount',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'AmountUnstaked',
		inputs: [
			{
				type: 'address',
				name: 'user',
				indexed: false,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'amount',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'ErrorReceived',
		inputs: [
			{
				type: 'uint256',
				name: 'requestId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'startAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'endAt',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'GameCreated',
		inputs: [
			{
				type: 'address',
				name: 'operator',
				indexed: false,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'startAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'stakingStartAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'stakingEndAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'endAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'MessageProcessedTo',
		inputs: [
			{
				type: 'uint256',
				name: '',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'MessageQueued',
		inputs: [
			{
				type: 'uint256',
				name: 'idx',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'bytes',
				name: 'data',
				indexed: false,
				internalType: 'bytes',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'MetaTxDecoded',
		inputs: [],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'OwnershipTransferred',
		inputs: [
			{
				type: 'address',
				name: 'previousOwner',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'newOwner',
				indexed: true,
				internalType: 'address',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'ResponseReceived',
		inputs: [
			{
				type: 'uint256',
				name: 'requestId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'startAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'endAt',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'valueAtStart',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'valueAtEnd',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'ResultDeclared',
		inputs: [
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint8',
				name: 'result',
				indexed: false,
				internalType: 'enum Skybet.Outcome',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoleAdminChanged',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				indexed: true,
				internalType: 'bytes32',
			},
			{
				type: 'bytes32',
				name: 'previousAdminRole',
				indexed: true,
				internalType: 'bytes32',
			},
			{
				type: 'bytes32',
				name: 'newAdminRole',
				indexed: true,
				internalType: 'bytes32',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoleGranted',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				indexed: true,
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'sender',
				indexed: true,
				internalType: 'address',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'RoleRevoked',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				indexed: true,
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'sender',
				indexed: true,
				internalType: 'address',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'TokenAdded',
		inputs: [
			{
				type: 'string',
				name: 'symbol',
				indexed: false,
				internalType: 'string',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'WithdrawWinnings',
		inputs: [
			{
				type: 'address',
				name: 'user',
				indexed: false,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'gameId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'amount',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'function',
		name: 'ATTESTOR_ROLE',
		inputs: [],
		outputs: [
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'BetsforGame',
		inputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'uint8',
				name: 'betType',
				internalType: 'enum Skybet.Outcome',
			},
			{
				type: 'uint256',
				name: 'totalTokensStaked',
				internalType: 'uint256',
			},
			{
				type: 'bool',
				name: 'hasClaimed',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'DEFAULT_ADMIN_ROLE',
		inputs: [],
		outputs: [
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'Games',
		inputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'address',
				name: 'operator',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'startAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'stakingStartAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'stakingEndAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'endAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'totalAmountUpstaked',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'totalAmountDownstaked',
				internalType: 'uint256',
			},
			{
				type: 'tuple',
				name: 'token',
				components: [
					{
						type: 'string',
						name: 'symbol',
						internalType: 'string',
					},
				],
				internalType: 'struct Skybet.Token',
			},
			{
				type: 'bool',
				name: 'resultDeclared',
				internalType: 'bool',
			},
			{
				type: 'uint8',
				name: 'result',
				internalType: 'enum Skybet.Outcome',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'STAKE_TOKEN',
		inputs: [],
		outputs: [
			{
				type: 'address',
				name: '',
				internalType: 'contract IERC20',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'Tokens',
		inputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'string',
				name: 'symbol',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'addStake',
		inputs: [
			{
				type: 'uint256',
				name: '_id',
				internalType: 'uint256',
			},
			{
				type: 'uint8',
				name: '_stakeType',
				internalType: 'enum Skybet.Outcome',
			},
			{
				type: 'uint256',
				name: '_amount',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'addToken',
		inputs: [
			{
				type: 'string',
				name: '_symbol',
				internalType: 'string',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'createGame',
		inputs: [
			{
				type: 'address',
				name: '_operator',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: '_startAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_stakingStartAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_stakingEndAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_endAt',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'declareResult',
		inputs: [
			{
				type: 'uint256',
				name: '_id',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'gameCount',
		inputs: [],
		outputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getCurrent',
		inputs: [],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getHeadIndex',
		inputs: [],
		outputs: [
			{
				type: 'uint32',
				name: '',
				internalType: 'uint32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getHeadStorageKey',
		inputs: [],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getRoleAdmin',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				internalType: 'bytes32',
			},
		],
		outputs: [
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getStorage',
		inputs: [
			{
				type: 'bytes',
				name: 'key',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getTailIndex',
		inputs: [],
		outputs: [
			{
				type: 'uint32',
				name: '',
				internalType: 'uint32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getTailStorageKey',
		inputs: [],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'grantRole',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'hasRole',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'metaTxGetNonce',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'metaTxPrepare',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
			{
				type: 'bytes',
				name: 'data',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'tuple',
				name: '',
				components: [
					{
						type: 'address',
						name: 'from',
						internalType: 'address',
					},
					{
						type: 'uint256',
						name: 'nonce',
						internalType: 'uint256',
					},
					{
						type: 'bytes',
						name: 'data',
						internalType: 'bytes',
					},
				],
				internalType: 'struct MetaTxReceiver.ForwardRequest',
			},
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'metaTxPrepareWithNonce',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
			{
				type: 'bytes',
				name: 'data',
				internalType: 'bytes',
			},
			{
				type: 'uint256',
				name: 'nonce',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'tuple',
				name: '',
				components: [
					{
						type: 'address',
						name: 'from',
						internalType: 'address',
					},
					{
						type: 'uint256',
						name: 'nonce',
						internalType: 'uint256',
					},
					{
						type: 'bytes',
						name: 'data',
						internalType: 'bytes',
					},
				],
				internalType: 'struct MetaTxReceiver.ForwardRequest',
			},
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'metaTxRollupU256CondEq',
		inputs: [
			{
				type: 'tuple',
				name: 'req',
				components: [
					{
						type: 'address',
						name: 'from',
						internalType: 'address',
					},
					{
						type: 'uint256',
						name: 'nonce',
						internalType: 'uint256',
					},
					{
						type: 'bytes',
						name: 'data',
						internalType: 'bytes',
					},
				],
				internalType: 'struct MetaTxReceiver.ForwardRequest',
			},
			{
				type: 'bytes',
				name: 'signature',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'metaTxVerify',
		inputs: [
			{
				type: 'tuple',
				name: 'req',
				components: [
					{
						type: 'address',
						name: 'from',
						internalType: 'address',
					},
					{
						type: 'uint256',
						name: 'nonce',
						internalType: 'uint256',
					},
					{
						type: 'bytes',
						name: 'data',
						internalType: 'bytes',
					},
				],
				internalType: 'struct MetaTxReceiver.ForwardRequest',
			},
			{
				type: 'bytes',
				name: 'signature',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'nextRequest',
		inputs: [],
		outputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'owner',
		inputs: [],
		outputs: [
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'queueGetBytes',
		inputs: [
			{
				type: 'bytes',
				name: 'key',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'queueGetPrefix',
		inputs: [],
		outputs: [
			{
				type: 'bytes',
				name: '',
				internalType: 'bytes',
			},
		],
		stateMutability: 'pure',
	},
	{
		type: 'function',
		name: 'queueGetUint',
		inputs: [
			{
				type: 'bytes',
				name: 'key',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'uint32',
				name: '',
				internalType: 'uint32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'removeStake',
		inputs: [
			{
				type: 'uint256',
				name: '_id',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_amount',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'renounceOwnership',
		inputs: [],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'renounceRole',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'requests',
		inputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'uint256',
				name: 'gameId',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'revokeRole',
		inputs: [
			{
				type: 'bytes32',
				name: 'role',
				internalType: 'bytes32',
			},
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'rollupU256CondEq',
		inputs: [
			{
				type: 'bytes[]',
				name: 'condKeys',
				internalType: 'bytes[]',
			},
			{
				type: 'bytes[]',
				name: 'condValues',
				internalType: 'bytes[]',
			},
			{
				type: 'bytes[]',
				name: 'updateKeys',
				internalType: 'bytes[]',
			},
			{
				type: 'bytes[]',
				name: 'updateValues',
				internalType: 'bytes[]',
			},
			{
				type: 'bytes[]',
				name: 'actions',
				internalType: 'bytes[]',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setAttestor',
		inputs: [
			{
				type: 'address',
				name: 'phatAttestor',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'supportsInterface',
		inputs: [
			{
				type: 'bytes4',
				name: 'interfaceId',
				internalType: 'bytes4',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'toUint32Strict',
		inputs: [
			{
				type: 'bytes',
				name: '_bytes',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				type: 'uint32',
				name: '',
				internalType: 'uint32',
			},
		],
		stateMutability: 'pure',
	},
	{
		type: 'function',
		name: 'tokenCount',
		inputs: [],
		outputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'transferOwnership',
		inputs: [
			{
				type: 'address',
				name: 'newOwner',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'withdrawWinnings',
		inputs: [
			{
				type: 'uint256',
				name: '_id',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
];