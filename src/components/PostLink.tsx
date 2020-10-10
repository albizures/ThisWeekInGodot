import React from 'react';
import { Badge, BadgeContainer } from './Icon';

interface Props {
	link: string;
	type?: 'article' | 'youtube';
	isMobile?: boolean;
	source?: string;
	label: string;
	version?: string;
}

export const PostLink: React.FC<Props> = (props) => {
	const { link, label, source, type, version } = props;

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
				{label}{' '}
			</a>
			{sourceCodeBadge}
			{typeBadge}
			{versionBadge}
		</span>
	);
};
