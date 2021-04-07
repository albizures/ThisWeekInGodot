import Head from 'next/head';
import Link from 'next/link';
import { Footer } from './Footer';
import { ExternalLink } from './Link';
import config from '../lib/config';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className="root container px-2 max-w-screen-md">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="manifest" href="/site.webmanifest" />
				<link
					href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto:ital,wght@0,300;1,300&display=swap"
					rel="stylesheet"
				></link>
				<link rel="apple-touch-icon" href="/favicon.png" />
				<meta name="theme-color" content="#fff" />
			</Head>
			<nav className="mt-4">
				<h1 className="text-4xl text-center font-heading">
					<Link href="/">
						<a>This Week in Godot</a>
					</Link>
				</h1>
				<div className="flex">
					<ul className="flex justify-center space-x-4 w-full">
						<li>
							<ExternalLink
								href={`https://twitter.com/${config.twitter_account}`}
							>
								Twitter
							</ExternalLink>
						</li>
						<li>
							<ExternalLink
								href={`https://github.com/${config.github_account}`}
							>
								GitHub
							</ExternalLink>
						</li>
						<li>
							<Link href="/rss.xml">
								<a className="underline">RSS</a>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<main className="mb-4">{children}</main>
			<Footer />
			<script
				data-goatcounter="https://thisweekingodot.goatcounter.com/count"
				async
				src="//gc.zgo.at/count.js"
			></script>
		</div>
	);
}
