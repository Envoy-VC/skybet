import type { ReactElement } from 'react';
import { Layout, NestedLayout } from '@/components/common';
import type { NextPageWithLayout } from './../_app';

import CreateGame from '@/sections/create-game';

const Create: NextPageWithLayout = () => {
	return <CreateGame />;
};

Create.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Create;
