import React from 'react';
import Link from 'next/link';
import { PostContent } from '../lib/posts';
import PostItem from './PostItem';
import Pagination from './Pagination';
import { TagContent } from '../lib/tags';

type Props = {
	withPagination?: boolean;
	posts: PostContent[];
	tags: TagContent[];
	pagination: {
		current: number;
		pages: number;
	};
};

export default function PostList(props: Props) {
	const { posts, pagination, withPagination = false } = props;

	return (
		<div className="mt-4">
			<h3 className="text-lg font-heading">Past Issues</h3>
			<div className="mt-2 border-t-2 border-b-2 py-2 border-gray-400">
				<ul className={'post-list'}>
					{posts.map((it, i) => (
						<li key={i}>
							<PostItem post={it} />
						</li>
					))}
				</ul>

				{withPagination ? (
					<Pagination
						current={pagination.current}
						pages={pagination.pages}
						link={{
							href: (page) => (page === 1 ? '/posts' : '/posts/page/[page]'),
							as: (page) => (page === 1 ? null : '/posts/page/' + page),
						}}
					/>
				) : (
					<p className="text-right">
						<Link href="/posts">
							<a className="underline">More...</a>
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}
