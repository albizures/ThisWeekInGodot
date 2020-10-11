import React from 'react';
import { Badge, BadgeContainer } from './Icon';
import { ExternalLink } from './Link';

interface Props {
	link: string;
	type?: 'article' | 'youtube';
	isMobile?: boolean;
	source?: string;
	label: string;
	version?: string;
	author?: string;
}

interface AuthorProps {
	twitter: string;
}

export const Author: React.FC<AuthorProps> = (props) => {
	const { twitter } = props;
	const link = `https://twitter.com/${twitter}`;
	return <ExternalLink href={link}>@{twitter}</ExternalLink>;
};

export const PostLink: React.FC<Props> = (props) => {
	const { link, label, source, type, version, author } = props;

	const sourceCodeBadge = source ? (
		<a href={source} target="_blank">
			<Badge name="code" />
		</a>
	) : null;

	const typeBadge = type ? (
		<a href={link} target="_blank">
			<Badge name={type} />
		</a>
	) : null;

	const versionBadge = version ? (
		<BadgeContainer>{version}</BadgeContainer>
	) : null;

	return (
		<span>
			<a href={link} target="_blank">
				{label}
			</a>{' '}
			{/* {author && (
				<>
					by <Author twitter={author} />
				</>
			)} */}
			<span className="whitespace-no-wrap inline-block align-text-bottom">
				{sourceCodeBadge}
				{typeBadge}
				{versionBadge}
			</span>
		</span>
	);
};
