import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import { Submission } from '../components/Submission';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import config from '../lib/config';
import PostList from '../components/PostList';
import { countPosts, listPostContent, PostContent } from '../lib/posts';
import { listTags, TagContent } from '../lib/tags';
import { Input, Label } from '../components/FormFields';

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
					className="p-6 mt-4 rounded bg-gray-200 shadow-xs"
					action="https://app.convertkit.com/forms/1707507/subscriptions"
					method="post"
				>
					<div className="grid grid-cols-2 gap-5">
						<div>
							<Label htmlFor="first_name">First name</Label>
							<Input
								name="fields[first_name]"
								id="first_name"
								required
								placeholder="Preferred name"
							/>
						</div>
						<div>
							<Label htmlFor="email_address">Email</Label>
							<Input
								type="email"
								id="email_address"
								required
								name="email_address"
								placeholder="you@example.com"
							/>
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
			<div>
				<Submission />
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
