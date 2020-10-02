import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import { listPostContent } from '../lib/posts';
import config from '../lib/config';
import Layout from '../components/Layout';

import RSS from 'rss';

const rss = new RSS({
	title: config.site_title,
	description: config.site_description,
	feed_url: config.base_url + '/rss.xml',
	site_url: config.base_url,
});

export const getStaticProps: GetStaticProps<{ props?: unknown }> = async () => {
	const posts = listPostContent(1, config.posts_per_page);

	posts
		.filter((post) => {
			if (!post.tags) {
				return true;
			}

			return !post.tags.includes('draft');
		})
		.forEach((post) => {
			rss.item({
				date: post.date,
				title: post.title,
				description: '',
				url: `${config.base_url}/posts/page/${post.slug}`,
			});
		});

	fs.writeFileSync('./public/rss.xml', rss.xml());

	return {
		props: {},
	};
};

const Rss = () => (
	<Layout>
		<h1 className="text-3xl text-center">
			You're probably looking for this{' '}
			<Link href="/rss.xml">
				<a className="underline text-blue-700 hover:text-blue-600">/rss.xml</a>
			</Link>
		</h1>
	</Layout>
);

export default Rss;
