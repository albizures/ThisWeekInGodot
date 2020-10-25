import React from 'react';
import { ItchData } from '../types';
import { PostLinkProps, PostLink } from './PostLink';
import { getItchData } from '../lib/itch';
import { Badge, BadgeContainer } from './Icon';

interface ItchLinkProps extends PostLinkProps {}

export const ItchLinksContainer: React.FC = (props) => {
	const { children } = props;
	// @ts-ignore
	if (process.env.NODE_ENV === 'email') {
		return <ul>{children}</ul>;
	}

	return <div className="flex flex-wrap place-content-center">{children}</div>;
};

export const ItchLink: React.FC<ItchLinkProps> = (props) => {
	const { link, source, label } = props;
	const [data, setData] = React.useState<ItchData | null>(null);

	React.useEffect(() => {
		getItchData(link).then(setData);
	}, [link]);

	// @ts-ignore
	if (process.env.NODE_ENV === 'email') {
		return (
			<li>
				<PostLink {...props} />
			</li>
		);
	}

	const sourceCodeBadge = source ? (
		<a href={source} target="_blank">
			<Badge name="code" />
		</a>
	) : null;

	return (
		<div className="max-w-2xs p-2 hover:z-50 cursor-pointer rounded leading-4 transform hover:scale-105 transition-all duration-150 origin-center">
			<a target="_blank" href={link}>
				<img className="itch-img" src={data && data.cover_image} alt={label} />
			</a>
			<a target="_blank" className="text-xs font-bold" href={link}>
				{label}
			</a>{' '}
			{sourceCodeBadge}
			<BadgeContainer>
				{data && (data.price === '$0.00' ? 'free' : data.price)}
			</BadgeContainer>
		</div>
	);
};
