import fs from 'fs';
import inlineCSS from 'inline-css';
import RSS from 'rss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { listPostContent } from '../lib/posts';
import { Layouts, compile, absolutePaths } from '../compile-mdx';
import config from '../lib/config';
import Layout from '../components/Layout';

const rss = new RSS({
	title: config.site_title,
	description: config.site_description,
	feed_url: config.base_url + '/rss.xml',
	site_url: config.base_url,
});

export const getStaticProps: GetStaticProps<{ props?: unknown }> =
	async () => {
		const posts = listPostContent(1, config.posts_per_page);

		await Promise.all(
			posts
				.filter((post) => {
					if (!post.tags) {
						return true;
					}

					return !post.tags.includes('draft');
				})
				.map((post) => {
					return inlineCSS(
						compile(post.content, Layouts.post, post),
						{
							url: `file://${process.cwd()}/`,
							applyLinkTags: true,
							removeHtmlSelectors: true,
						},
					)
						.then(absolutePaths)
						.then((html: string) => {
							rss.item({
								date: post.date,
								title: post.title,
								description: absolutePaths(html),
								url: `${config.base_url}/posts/${post.slug}`,
							});
						});
				}),
		);

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
				<a className="underline text-blue-700 hover:text-blue-600">
					/rss.xml
				</a>
			</Link>
		</h1>
	</Layout>
);

export default Rss;
