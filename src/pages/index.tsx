import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import config from '../lib/config';
import PostList from '../components/PostList';
import { countPosts, listPostContent, PostContent } from '../lib/posts';
import { listTags, TagContent } from '../lib/tags';

type Props = {
	posts: PostContent[];
	tags: TagContent[];
	pagination: {
		current: number;
		pages: number;
	};
};

const Index: React.FC<Props> = (props) => {
	const { posts, tags, pagination } = props;

	return (
		<Layout>
			<BasicMeta url={'/'} />
			<OpenGraphMeta url={'/'} />
			<TwitterCardMeta url={'/'} />

			<div className="my-8">
				<h2 className="text-center text-2xl font-light font-heading">
					Find out what happened this week in Godot!
				</h2>
				<form className="flex justify-center mt-4">
					<label className="sr-only" htmlFor="email">
						Enter your email
					</label>
					<input
						className="next-shadow py-2 pr-12 pl-4 rounded-full -mr-8 outline-none border focus:shadow-md focus:border-blue-700 bg-gray-300 focus:bg-transparent"
						type="text"
						id="email"
						name="email"
						placeholder="Enter your email"
					/>
					<button className="rounded-full border border-blue-700 bg-blue-700 text-white px-4 py-2">
						Subscribe
					</button>
				</form>
				<div>
					<PostList posts={posts} tags={tags} pagination={pagination} />
				</div>
			</div>
		</Layout>
	);
};

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

export default Index;
