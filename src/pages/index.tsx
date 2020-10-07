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
				<h4 className="mx-8 text-center italic">
					A simple weekly newsletter to stay tuned with news, tutorials, game
					and demo releases and more.
				</h4>
				<form
					className="p-6 mt-4 rounded bg-gray-200"
					action="https://app.convertkit.com/forms/1707507/subscriptions"
					method="post"
				>
					<div className="grid grid-cols-2 gap-5">
						<div>
							<label
								className="block text-base font-bold leading-5 text-gray-700"
								htmlFor="first_name"
							>
								First name
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									className="appearance-none border border-gray-400 px-3 py-2 rounded focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
									type="text"
									id="first_name"
									required
									name="fields[first_name]"
									placeholder="Preferred name"
								/>
							</div>
						</div>
						<div>
							<label
								className="block text-base font-bold leading-5 text-gray-700"
								htmlFor="email_address"
							>
								Email
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									className="appearance-none border border-gray-400 px-3 py-2 rounded focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
									type="email"
									id="email_address"
									required
									name="email_address"
									placeholder="you@example.com"
								/>
							</div>
						</div>
					</div>
					<div className="w-full flex items-center justify-center mt-5">
						<button className="rounded border border-blue-700 bg-blue-700 text-white px-4 py-2">
							Subscribe
						</button>
					</div>
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
