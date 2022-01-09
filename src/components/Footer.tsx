import React from 'react';
import { ExternalLink } from './Link';
import config from '../lib/config';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer>
			<div>
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
				<p className="text-center my-2">
					© 2022 by Jose Albizures. All rights reserved.
				</p>
			</div>
			<div className="text-center mb-4">Made with 💙</div>
		</footer>
	);
};
