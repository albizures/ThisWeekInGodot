import inlineCSS from 'inline-css';
import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Layout from './layouts/email';
import MDX from '@mdx-js/runtime';
import matter from 'gray-matter';
import { MDXProvider } from '@mdx-js/react';

const name = process.argv[2];

const basePath = './src/pages/posts';
const postPath = `${basePath}/${name}.mdx`;

if (!fs.statSync(postPath).isFile()) {
	throw new Error(`Invalid name: ${name}`);
}

const MDXContent = fs.readFileSync(postPath, 'utf8');
const meta = matter(MDXContent);
const { content } = meta;

const props = {
	title: meta.data.title as string,
	slug: meta.data.slug as string,
	author: meta.data.author as string,
	date: new Date(meta.data.date as string),
	tags: meta.data.tags as string[],
};

const components = {};

inlineCSS(
	renderToStaticMarkup(
		<Layout {...props}>
			<MDXProvider components={components}>
				<MDX>{content}</MDX>
			</MDXProvider>
		</Layout>,
	),
	{
		url: `file://${process.cwd()}/`,
		applyLinkTags: true,
		removeHtmlSelectors: true,
	},
).then((html: string) => {
	fs.writeFileSync('./dist/email.html', html);
});
