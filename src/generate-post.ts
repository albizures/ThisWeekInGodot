import fs from 'fs';
import papaparse from 'papaparse';

interface Link {
	label: string;
	link: string;
	type: string;
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
	'Made With Godot',
	'Some Cool Tweets',
];

const data = result.data
	.slice(1)
	.reduce<Links>((links: Links, item: string[]) => {
		const [link, label, section, type, language] = item;
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
		});

		return links;
	}, {});

const post = sections.reduce<string>((post, section: string) => {
	if (!data[section]) {
		return post;
	}

	const links = data[section].reduce<string>((prev, item) => {
		const link = [];

		if (item.language !== '') {
			link.push(`- [${item.language}] <PostLink`);
		} else {
			link.push('- <PostLink');
		}

		if (item.type) {
			link.push(`  type="${item.type}"`);
		}

		link.push(`  label="${item.label}"`);
		link.push(`  link="${item.link}"`);
		link.push('/>');

		return `${prev}\n${link.join('\n')}`;
	}, '');
	return `${post}
## ${section}
${links}
`;
}, '');

fs.writeFileSync('./dist/post.mdx', post);
