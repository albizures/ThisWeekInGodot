import fs from 'fs';
import papaparse from 'papaparse';

interface Link {
	label: string;
	link: string;
	type: string;
	source: string;
	language: string;
}

type Links = Record<string, Link[]>;

const result = papaparse.parse(fs.readFileSync('./links.csv', 'utf8'));

const sections = [
	'Official',
	'News',
	'Miscellaneous',
	'Tutorials',
	'Libraries Assets and Add-ons',
	'DevLogs',
	'Made with Godot',
	'Some Cool Tweets',
];

const createPostLink = (item: Link): string => {
	const link = [];

	if (item.language !== '') {
		link.push(`- [${item.language}] <PostLink`);
	} else {
		link.push('- <PostLink');
	}

	if (item.type) {
		link.push(`  type="${item.type}"`);
	}
	if (item.source) {
		link.push(`  source="${item.source}"`);
	}

	link.push(`  label="${item.label}"`);
	link.push(`  link="${item.link}"`);
	link.push('/>');

	return link.join('\n');
};

const createTweetLink = (item: Link): string => {
	const link = ['<TwitterTweetEmbed'];
	const links = item.link.split('/');

	link.push(`tweetId="${links[links.length - 1]}"`);
	link.push("options={{ height: '100%' }} />");

	return link.join(' ');
};

const data = result.data
	.slice(1)
	.reduce<Links>((links: Links, item: string[]) => {
		const [link, label, section, type, language, source] = item;
		if (!link) {
			return links;
		}

		if (!links[section]) {
			links[section] = [];
		}

		links[section].push({
			link,
			label,
			type,
			language,
			source,
		});

		return links;
	}, {});

const post = sections.reduce<string>((post, section: string) => {
	if (!data[section]) {
		return post;
	}

	const links = data[section].reduce<string>((prev, item) => {
		const link =
			section === 'Some Cool Tweets'
				? createTweetLink(item)
				: createPostLink(item);
		return `${prev}\n${link}`;
	}, '');
	return `${post}
## ${section}
${links}
`;
}, '');

fs.writeFileSync('./dist/post.mdx', post);
