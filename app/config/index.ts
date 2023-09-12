export const TW_CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID || '';

export const ENV = process.env.NEXT_PUBLIC_ENV ?? 'development';

export const SKYBET_ADDRESS =
	ENV === 'production' ? '' : '0xB44Ae12e3245A3FbdD9445c536ef568a702e77DF';
export const TOKEN_ADDRESS =
	ENV === 'production' ? '' : '0xc7449dC99168ACc5B4701a13F14b85d280bD9811';
