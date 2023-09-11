import type { ReactElement } from 'react';
import Layout from '@/components/common/layout';
import type { NextPageWithLayout } from '../_app';

import Game from '@/sections/game';
import { useRouter } from 'next/router';

const GameRoom: NextPageWithLayout = () => {
	const router = useRouter();
	const { gameId } = router.query;
	return <Game id={gameId?.at(0) as string} />;
};

GameRoom.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default GameRoom;
