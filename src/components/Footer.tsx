import React from 'react';
import { ExternalLink } from './Link';
import config from '../lib/config';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer>
			<div className="bg-gray-400">
				<div className="container max-w-screen-md text-center py-4">
					<h3 className="text-xl font-bold">Other projects</h3>
					<div className="flex gap-4 justify-center mt-2">
						<a
							className="underline"
							href="https://flowmodoro.vyke.dev/"
						>
							Flowmodoro app
						</a>
						<a className="underline" href="https://clock.vyke.dev/">
							Online clock
						</a>
					</div>
				</div>
			</div>
			<div className="bg-gray-400 py-2 border-t border-gray-500">
				<div className="flex justify-center space-x-4 flex-wrap">
					<ExternalLink
						href={`https://twitter.com/${config.twitter_account}`}
					>
						Twitter
					</ExternalLink>
					<ExternalLink
						href={`https://github.com/${config.github_account}`}
					>
						GitHub
					</ExternalLink>
					<Link href="/rss.xml">
						<a className="underline">RSS</a>
					</Link>
					{/* <ExternalLink href={`https://github.com/${config.github_account}`}>
						Atom Feed
					</ExternalLink> */}
					<Link href="/privacy-policy">
						<a className="underline">Privacy Policy</a>
					</Link>
				</div>
				<p className="text-center py-2">
					© 2022 by Jose Albizures. All rights reserved.
				</p>
			</div>
			<div className="text-center pb-4 bg-gray-400">
				<span>Made with 💙</span>
			</div>
		</footer>
	);
};
