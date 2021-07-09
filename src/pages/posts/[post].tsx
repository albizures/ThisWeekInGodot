import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PostLayout } from '../../layouts/post';
import { Badge } from '../../components/Icon';
import { PostLink } from '../../components/PostLink';
import { Card } from '../../components/Card';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const components = { Badge, PostLink, Card, TwitterTweetEmbed };

interface Props {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	frontMatter: {
		title: string;
		date: string;
		slug: string;
		description: string;
		tags: string[];
		author: string;
	};
}

const Post: React.FC<Props> = (props) => {
	const { source, frontMatter } = props;
	return (
		<PostLayout {...frontMatter}>
			<MDXRemote {...source} components={components} />
		</PostLayout>
	);
};

export default Post;

const path = './src/pages/posts';

export const getStaticProps: GetStaticProps = async (context) => {
	const { params } = context;
	const { post } = params;

	try {
		const source = await fs.promises.readFile(`${path}/${post}.mdx`, 'utf8');
		const { content, data } = matter(source);
		const mdxSource = await serialize(content, { scope: data });

		data.date = data.date.toString();

		return { props: { source: mdxSource, frontMatter: data } };
	} catch (error) {
		return {
			props: {},
			notFound: true,
		};
	}
};

export const getStaticPaths = async () => {
	const files = await fs.promises.readdir(path);
	const paths = [];
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		if (!file.includes('.mdx')) {
			continue;
		}

		const content = await fs.promises.readFile(`${path}/${file}`, 'utf8');
		const {
			data: { tags },
		} = matter(content);
		if (tags.includes('draft')) {
			continue;
		}

		paths.push({
			params: { post: file.replace('.mdx', '') },
		});
	}

	return {
		paths,
		fallback: false,
	};
};
