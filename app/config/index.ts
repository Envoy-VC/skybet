import { TOKEN_ABI } from './abis/token';
import { SKYBET_ABI } from './abis/skybet';

export const TW_CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID || '';

export const ENV = process.env.NEXT_PUBLIC_ENV ?? 'development';

export const SKYBET_ADDRESS =
	ENV === 'production'
		? '0x640CCEEf4b6d3B46a208EBc44bd20eE70cAAe9A6'
		: '0xB44Ae12e3245A3FbdD9445c536ef568a702e77DF';
export const TOKEN_ADDRESS =
	ENV === 'production'
		? '0x853BDA8D4C5d39A27ee6F580C028cacFbf6ebe49'
		: '0xc7449dC99168ACc5B4701a13F14b85d280bD9811';

export { TOKEN_ABI, SKYBET_ABI };
