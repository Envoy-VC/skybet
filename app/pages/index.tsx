import type { ReactElement } from 'react';
import { Layout, NestedLayout } from '@/components/common';
import type { NextPageWithLayout } from './_app';

import Home from '@/sections/home';

const Page: NextPageWithLayout = () => {
	return <Home />;
};

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Page;
