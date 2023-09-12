export const TW_CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID || '';

export const ENV = process.env.NEXT_PUBLIC_ENV ?? 'development';

export const SKYBET_ADDRESS =
	ENV === 'production' ? '' : '0xfD6A457139AaD16FbaF3ECeb53AeB9B6804A2dCe';
export const TOKEN_ADDRESS =
	ENV === 'production' ? '' : '0x8EfA13de749102f48CB43b490E9C794f5381a7c7';
