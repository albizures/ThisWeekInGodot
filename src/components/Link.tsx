import React from 'react';

interface LinkProps {
	target?: string;
	rel?: string;
	href: string;
}

export const Link: React.FC<LinkProps> = (props) => {
	const { children, ...others } = props;
	return (
		<a {...others} className="underline">
			{children}
		</a>
	);
};

interface ExternalLinkProps {
	href: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
	const { children, href } = props;
	return (
		<Link href={href} target="_blank" rel="noopener">
			{children}
		</Link>
	);
};
