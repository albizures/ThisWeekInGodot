import React from 'react';
import Author from '../components/Author';
import PostDate from '../components/Date';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import JsonLdMeta from '../components/meta/JsonLdMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { DraftBanner } from '../components/DraftBanner';
import { getAuthor } from '../lib/authors';
import { getTag } from '../lib/tags';
import { Submission } from '../components/Submission';

type Props = {
	title: string;
	date: string | Date;
	slug: string;
	description: string;
	tags: string[];
	author: string;
};

export const PostLayout: React.FC<Props> = (props) => {
	const {
		title,
		date: rawDate,
		slug,
		author,
		tags = [],
		description,
		children,
	} = props;

	const date = new Date(rawDate);

	const keywords = tags.map((it) => getTag(it).name);
	const authorName = getAuthor(author).name;

	const isDraft = tags.includes('draft');

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
						<div className={'metadata'}>
							<div>
								<PostDate date={date} />
								<Author author={getAuthor(author)} />
							</div>
						</div>
					</header>
					<div className="mb-8">{children}</div>
					<div>
						<h2>✋ Before you go</h2>
						<p className="pb-4">
							Hey, José here, the maintainer of this newsletter, I
							hope you enjoy this issue, and if you find it helpful,
							please consider{' '}
							<a
								className="underline text-blue-800"
								href="https://ko-fi.com/albizures"
							>
								buying me a coffee
							</a>{' '}
							and support my work
						</p>
					</div>
				</article>
			</div>
			<div>
				<Submission />
			</div>
		</Layout>
	);
};
