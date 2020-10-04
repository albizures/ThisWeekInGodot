import React from 'react';
// import Author from '../components/Author';
import Date from '../components/Date';
import { DraftBanner } from '../components/DraftBanner';
import { getAuthor } from '../lib/authors';
import config from '../../config.json';

type Props = {
	title: string;
	date: Date;
	slug: string;
	tags: string[];
	author: string;
};

const Email: React.FC<Props> = (props) => {
	const { title, date, author, tags, children, slug } = props;
	const isDraft = tags.includes('draft');
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.post { margin: 0 3rem; }
				`,
				}}
			/>
			<div className="text-center mt-4">
				<p>
					Email isn't displaying correctly?
					<hr />
					<a
						className="underline text-red-500"
						href={`${config.base_url}/posts/${slug}`}
					>
						Read this e-mail on the Web
					</a>
				</p>
			</div>
			<nav className="mt-4">
				<h1 className="text-4xl text-center font-heading">
					<a href={config.base_url}>This Week in Godot</a>
				</h1>
				<div>
					<ul className="text-center space-x-4 w-full">
						<li className="inline">
							<a
								className="underline"
								href={`https://twitter.com/${config.twitter_account}`}
							>
								Twitter
							</a>
						</li>
						<li className="inline">
							<a
								className="underline"
								href={`https://github.com/${config.github_account}`}
							>
								GitHub
							</a>
						</li>
						<li className="inline">
							<a href="/rss.xml" className="underline">
								RSS
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<link rel="stylesheet" href="./dist/styles.css" />
			<div className="max-w-lg mx-auto">{isDraft && <DraftBanner />}</div>
			<div className="post max-w-lg mx-auto">
				<div>
					<div>
						<h1>{title}</h1>
						<div className={'metadata'}>
							<div>
								<Date date={date} />
								{/* <Author author={getAuthor(author)} /> */}
							</div>
						</div>
					</div>
					<div className="mb-8">{children}</div>
				</div>
			</div>
		</>
	);
};

export default Email;
