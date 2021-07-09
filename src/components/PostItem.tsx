import React from 'react';
import { PostContent } from '../lib/posts';
import Date from './Date';
import Link from 'next/link';
import { parseISO } from 'date-fns';

type Props = {
	post: PostContent;
};
export default function PostItem({ post }: Props) {
	return (
		<Link href={'/posts/' + post.slug}>
			<a className="text-black text-sm hover:bg-gray-200 py-2 px-4 flex justify-between">
				<h2 className="m-0 font-light">{post.title}</h2>
				<Date date={parseISO(post.date)} />
			</a>
		</Link>
	);
}
