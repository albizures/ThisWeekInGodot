import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import PostList from '../../components/PostList';
import config from '../../lib/config';
import { countPosts, listPostContent, PostContent } from '../../lib/posts';
import { listTags, TagContent } from '../../lib/tags';

type Props = {
	posts: PostContent[];
	tags: TagContent[];
	pagination: {
		current: number;
		pages: number;
	};
};

export default function Index({ posts, tags, pagination }: Props) {
	const url = '/posts';
	const title = 'Past issues';

	return (
		<Layout>
			<BasicMeta url={url} title={title} />
			<OpenGraphMeta url={url} title={title} />
			<TwitterCardMeta url={url} title={title} />
			<PostList
				withPagination
				posts={posts}
				tags={tags}
				pagination={pagination}
			/>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = listPostContent(1, config.posts_per_page);
	const tags = listTags();
	const pagination = {
		current: 1,
		pages: Math.ceil(countPosts() / config.posts_per_page),
	};
	return {
		props: {
			posts,
			tags,
			pagination,
		},
	};
};
