import type { ReactElement } from 'react';
import { Layout, NestedLayout } from '@/components/common';
import type { NextPageWithLayout } from '../../_app';

import Game from '@/sections/game';
import { useRouter } from 'next/router';

const GameRoom: NextPageWithLayout = () => {
	const router = useRouter();
	const { gameId } = router.query;
	console.log(gameId);
	return <Game id={gameId?.at(0) as string} />;
};

GameRoom.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default GameRoom;
