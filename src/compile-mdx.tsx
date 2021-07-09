import fs from 'fs';
import MDX from '@mdx-js/runtime';
import matter from 'gray-matter';
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { renderToStaticMarkup } from 'react-dom/server';
import { MDXProvider } from '@mdx-js/react';
import { Badge } from './components/Icon';
import { PostLink } from './components/PostLink';
import { Card } from './components/Card';
import EmailLayout from './layouts/email';
import { PostLayout } from './layouts/post';
import config from './lib/config';

export enum Layouts {
	email,
	post,
	rss,
}

const components = {
	Badge,
	PostLink,
	TwitterTweetEmbed,
	Card,
};

const attrRegex =
	/((href|src|codebase|cite|background|cite|action|profile|formaction|icon|manifest|archive)=["'])(([.]+\/)|(?:\/)|(?=#))(?!\/)/g;
const urlRegex = /(url\(["'])(\/)/g;

export const compileFile = (file: string, layout: Layouts) => {
	const content = fs.readFileSync(file, 'utf8');

	return compile(content, layout);
};

interface Data {
	title?: string;
	slug?: string;
	author?: string;
	date?: string;
	tags?: string[];
	description?: string;
}

export const compile = (
	MDXContent: string,
	layout: Layouts,
	metadata: Data = {},
) => {
	const meta = matter(MDXContent);
	const data = {
		...meta.data,
		...metadata,
	};

	const props = {
		title: data.title as string,
		slug: data.slug as string,
		author: data.author as string,
		date: new Date(data.date as string),
		tags: data.tags as string[],
		description: data.description ?? '',
	};

	const { content } = meta;

	const Layout = layout === Layouts.email ? EmailLayout : PostLayout;

	const styles =
		layout === Layouts.rss ? (
			<link rel="stylesheet" href="./dist/styles.css" />
		) : null;

	return renderToStaticMarkup(
		<>
			{styles}
			<Layout {...props}>
				<MDXProvider components={components}>
					<MDX>{content}</MDX>
				</MDXProvider>
			</Layout>
		</>,
	);
};

export const absolutePaths = (html: string) => {
	return html
		.replace(attrRegex, `$1${config.base_url}/$4`)
		.replace(urlRegex, `$1${config.base_url}$2`);
};
