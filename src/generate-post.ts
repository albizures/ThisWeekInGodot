import fs from 'fs';
import papaparse from 'papaparse';
import got from 'got';
import metascraper from 'metascraper';
import authorScraper from 'metascraper-author';
import dateScraper from 'metascraper-date';
import descriptionScraper from 'metascraper-description';
import imageScraper from 'metascraper-image';
import logoScraper from 'metascraper-logo';
import publisherScraper from 'metascraper-publisher';
import titleScraper from 'metascraper-title';
import urlScraper from 'metascraper-url';
import faviconScraper from 'metascraper-logo-favicon';
import youtubeScraper from 'metascraper-youtube';
import { Sections } from './types';
import { Label } from './components/FormFields';

const isTwitch = (link: string) => {
	return link.includes('twitch.tv');
};

const isGodotAssetLibrary = (link: string) => {
	return link.includes('godotengine.org/asset-library');
};

const isItchio = (link: string) => {
	return link.includes('.itch.io');
};

const isGameFromScratch = (link: string) => {
	return link.includes('gamefromscratch.com');
};

const scraper = metascraper([
	{
		//@ts-ignore
		title: [
			({ htmlDom: $, url }) => {
				return (
					isTwitch(url) &&
					$('h2[data-a-target="stream-title"]').text()
				);
			},
		],
		description: [
			({ htmlDom: $, url }) => {
				return isTwitch(url) && ' ';
			},
		],
		publisher: [
			({ htmlDom: $, url }) => {
				return isGodotAssetLibrary(url) && 'Godot Asset Library';
			},
		],
		logo: [
			({ htmlDom: $, url }) => {
				return (
					isGodotAssetLibrary(url) &&
					'https://godotengine.org/themes/godotengine/assets/favicon.png'
				);
			},
		],
		image: [
			// Godot Asset Library
			({ htmlDom: $, url }) => {
				if (!isGodotAssetLibrary(url)) {
					return;
				}
				return $('.media .media-left img.media-object').attr('src');
			},
		],
	},
	authorScraper(),
	dateScraper(),
	descriptionScraper(),
	imageScraper(),
	logoScraper(),
	publisherScraper(),
	titleScraper(),
	urlScraper(),
	faviconScraper(),
	youtubeScraper(),
	{
		//@ts-ignore
		author: [
			({ htmlDom, url }) => {
				return isGameFromScratch(url) && 'Gamefromscratch';
			},
			// youtube
			({ htmlDom: $ }) => {
				return $('[itemprop="author"]')
					.find('[itemprop="name"]')
					.prop('content');
			},
			({ htmlDom: $, url }) => {
				if (isTwitch(url)) {
					console.log(
						$('.metadata-layout__support a h1').text(),
						$('.metadata-layout__support').html(),
						$.html(),
					);

					return $('.metadata-layout__support a h1').text();
				}
			},
			// itch.io
			({ htmlDom: $, url }) => {
				if (!isItchio(url)) {
					return;
				}
				const rows = $('.game_info_panel_widget tr').toArray();

				for (let index = 0; index < rows.length; index++) {
					const row = rows[index];
					const $row = $(row);
					const columns = $row.find('td');
					if (columns.first().text() === 'Author') {
						return $row.find('a').text();
					}
				}
			},
			// Godot Asset Library
			({ htmlDom: $, url }) => {
				if (!isGodotAssetLibrary(url)) {
					return;
				}
				return $('.media .media-body .text-muted a').first().text();
			},
		],
		description: [
			// Godot Asset Library
			({ htmlDom: $, url }) => {
				if (!isGodotAssetLibrary(url)) {
					return;
				}
				return $('.media .media-body .text-muted').next('p').text();
			},
		],
		date: [
			// Godot Asset Library
			({ htmlDom: $, url }) => {
				if (!isGodotAssetLibrary(url)) {
					return;
				}

				return $('.media-body .text-muted')
					.text()
					.split(';')[2]
					.trim();
			},
		],
	},
]);

interface Link {
	label: string;
	link: string;
	type: string;
	source: string;
	language: string;
	section: string;
}

const headers = {
	'user-agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81',
};

type Links = Record<string, Link[]>;

const result = papaparse.parse(
	fs.readFileSync('./links.csv', 'utf8'),
);

const getSteamAuthor = async (link: string): Promise<string> => {
	const { pathname } = new URL(link);
	const [, , id] = pathname.split('/');

	const { body: details } = await got(
		`https://store.steampowered.com/api/appdetails?appids=${id}`,
		{
			headers,
		},
	);
	const data = JSON.parse(details)[id].data;

	return data.developers[0];
};

const sections = Object.values(Sections);

const labelSections = {
	[Sections.DevLogs]: `🧑‍💻 ${Sections.DevLogs}`,
	[Sections.LibrariesAssetsAddOns]: `🛠 Libraries Assets and Plugins`,
	[Sections.MadeWithGodot]: `🤖 ${Sections.MadeWithGodot}`,
	[Sections.Miscellaneous]: `🤷 ${Sections.Miscellaneous}`,
	[Sections.News]: `📰 ${Sections.News}`,
	[Sections.Official]: `👮 ${Sections.Official}`,
	[Sections.SomeCoolTweets]: `🐦 ${Sections.SomeCoolTweets}`,
	[Sections.Tutorials]: `✍️ ${Sections.Tutorials}`,
};

const createPostLink = async (item: Link): Promise<string> => {
	const { body: html, url } = await got(item.link, { headers });
	let {
		author,
		date,
		description,
		title,
		publisher,
		image,
		// @ts-ignore
		logo,
	} = await scraper({
		html,
		url,
	});

	if (item.link.includes('youtube.com')) {
		item.link = item.link.replace(
			'https://www.youtube.com/watch?v=',
			'https://youtu.be/',
		);
	}

	description = description?.trim().split('\n')[0];

	if (item.link.includes('store.steampowered.com') && !author) {
		try {
			author = await getSteamAuthor(item.link);
		} catch (error) {
			console.log('Unable to get author from steam', error);
		}
	}

	const missingData = Object.entries({
		author,
		date,
		description,
		title,
		publisher,
		image,
		logo,
	})
		.filter(([, val]) => !val)
		.map(([name]) => name)
		.join(',')
		.trim();

	if (missingData) {
		console.log(`Generating "${title} ${item.link}"`);
		console.log(`\tmissing data: ${missingData}`);
	}

	const link = [];

	link.push('<Card');
	link.push(`  author="${author}"`);
	link.push(`  link="${item.link}"`);
	link.push(`  section="${item.section}"`);
	if (item.language !== '') {
		link.push(`  label="[${item.language}] ${title}"`);
	} else {
		link.push(`  label="${item.label || title}"`);
	}
	link.push(`  description="${description}"`);
	link.push(`  publisher="${publisher}"`);
	link.push(`  icon="${logo}"`);
	link.push(`  cover="${image}"`);
	link.push(`  date="${date}"`);
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
			section,
		});

		return links;
	}, {});

const generete = async () => {
	let post = '';
	for (let index = 0; index < sections.length; index++) {
		const section = sections[index];
		if (!data[section]) {
			continue;
		}

		post = `${post}\n\n## ${labelSections[section]}`;

		for (let index = 0; index < data[section].length; index++) {
			const link = data[section][index];

			try {
				const item =
					section === 'Some Cool Tweets'
						? await createTweetLink(link)
						: await createPostLink(link);

				post = `${post}\n\n${item}`;
			} catch (error) {
				console.error(
					`🔴 Unable to generate card for '${link.link}'`,
				);
				console.error(error);
			}
		}
	}

	await fs.promises.writeFile('./dist/post.mdx', post);
};

generete().then(console.log).catch(console.log);
