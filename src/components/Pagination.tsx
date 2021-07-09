import React from 'react';
import { generatePagination } from '../lib/pagination';
import Link from 'next/link';

type Props = {
	current: number;
	pages: number;
	link: {
		href: (page: number) => string;
		as: (page: number) => string;
	};
};
export default function Pagination({ current, pages, link }: Props) {
	const pagination = generatePagination(current, pages);
	return (
		<ul className="m-0 p-0 text-center mt-2">
			{pagination.map((it, i) => (
				<li className="inline-block mr-4" key={i}>
					{it.excerpt ? (
						'...'
					) : (
						<Link href={link.href(it.page)} as={link.as(it.page)}>
							<a
								className={
									it.page === current
										? 'font-bold bg-gray-200 rounded p-1'
										: 'hover:underline'
								}
							>
								{it.page}
							</a>
						</Link>
					)}
				</li>
			))}
		</ul>
	);
}
