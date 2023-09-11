import React from 'react';
import { NextSeo } from 'next-seo';

export const seoData = {
	title: undefined,
	description: 'description',
	ogImage: 'https://example.com/og.png',
};

interface Props {
	title?: string;
	description?: string;
	ogImage?: string;
}

const SEO = ({
	title = seoData.title,
	description = seoData.description,
	ogImage = seoData.ogImage,
}: Props) => {
	return (
		<NextSeo
			title={title}
			titleTemplate='%s | app-name'
			defaultTitle='app-name'
			description={description}
			openGraph={{
				url: 'https://app-name.com',
				title: 'Blip',
				description: 'description',
				images: [
					{
						url: ogImage,
						width: 1200,
						height: 630,
						alt: 'App Name OG Image',
						type: 'image/png',
					},
				],
				siteName: 'App Name',
			}}
			twitter={{
				handle: '@handle4',
				site: '@handle',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
