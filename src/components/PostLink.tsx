import React from 'react';
import { Badge, BadgeContainer } from './Icon';
import { ExternalLink } from './Link';

type BadgeType = 'article' | 'youtube' | 'twitter';

interface Props {
	link: string;
	type?: BadgeType;
	isMobile?: boolean;
	source?: string;
	label: string | React.ReactChildren;
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

const getBadge = (type: BadgeType, link: string) => {
	if (!type) {
		return null;
	}

	if (type === 'twitter') {
		return null;
	}

	return (
		<a href={link} target="_blank">
			<Badge name={type} />
		</a>
	);
};

export const PostLink: React.FC<Props> = (props) => {
	const { link, label, source, type, version, author, isMobile } = props;

	const sourceCodeBadge = source ? (
		<a href={source} target="_blank">
			<Badge name="code" />
		</a>
	) : null;
	const mobileBadge = isMobile ? <Badge name="smartphone" /> : null;

	const typeBadge = getBadge(type, link);

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
				{mobileBadge}
				{versionBadge}
			</span>
		</span>
	);
};
