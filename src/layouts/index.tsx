import React from 'react';
import Author from '../components/Author';
import Date from '../components/Date';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import JsonLdMeta from '../components/meta/JsonLdMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { DraftBanner } from '../components/DraftBanner';
import { getAuthor } from '../lib/authors';
import { getTag } from '../lib/tags';
import { IconLabel } from '../components/Icon';

type Props = {
	title: string;
	date: Date;
	slug: string;
	description: string;
	tags: string[];
	author: string;
};

export default function Index({
	title,
	date,
	slug,
	author,
	tags,
	description,
}: Props) {
	const keywords = tags.map((it) => getTag(it).name);
	const authorName = getAuthor(author).name;

	const isDraft = tags.includes('draft');

	return ({ children: content }) => {
		return (
			<Layout>
				<BasicMeta
					url={`/posts/${slug}`}
					title={title}
					keywords={keywords}
					description={description}
				/>
				<TwitterCardMeta
					url={`/posts/${slug}`}
					title={title}
					description={description}
				/>
				<OpenGraphMeta
					url={`/posts/${slug}`}
					title={title}
					description={description}
				/>
				<JsonLdMeta
					url={`/posts/${slug}`}
					title={title}
					keywords={keywords}
					date={date}
					author={authorName}
					description={description}
				/>
				{isDraft && <DraftBanner />}
				<div className={'post'}>
					<article>
						<header>
							<h1>{title}</h1>
							<div className="space-x-1 my-2">
								<IconLabel name="article" />
								<IconLabel name="youtube" />
								<IconLabel name="code" />
								<IconLabel name="smartphone" />
							</div>
							<div className={'metadata'}>
								<div>
									<Date date={date} />
									<Author author={getAuthor(author)} />
								</div>
							</div>
						</header>
						<div className="mb-8">{content}</div>
					</article>
				</div>
			</Layout>
		);
	};
}
