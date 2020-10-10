import React from 'react';

type IconNames = 'article' | 'code' | 'smartphone' | 'youtube';

interface Props {
	name: IconNames;
}

export const Icon: React.FC<Props> = (props) => {
	const { name } = props;
	return (
		<span
			className="inline-block align-middle w-3 h-3 bg-cover bg-center"
			style={{
				backgroundImage: `url('/images/${name}.svg')`,
				backgroundSize: 'cover',
				marginBottom: 2,
			}}
		></span>
	);
};

interface LabelProps extends Props {}

const names: Record<IconNames, string> = {
	article: 'Article',
	youtube: 'Youtube Video',
	code: 'Source Code',
	smartphone: 'Mobile Game',
};

export const IconLabel: React.FC<LabelProps> = (props) => {
	const { name } = props;
	return (
		<span className="leading-4 px-1 text-xs bg-gray-100 inline-block rounded-full border border-gray-400">
			<Icon name={name} /> {names[name]}
		</span>
	);
};

export const BadgeContainer: React.FC = (props) => {
	const { children } = props;
	return (
		<span className="mr-1 leading-4 px-1 text-xs bg-gray-300 opacity-50 hover:opacity-100 inline-block rounded-full border border-gray-500">
			{children}
		</span>
	);
};

export const Badge: React.FC<Props> = (props) => {
	const { name } = props;
	return (
		<BadgeContainer>
			<Icon name={name} /> <span className="sr-only">{names[name]}</span>
		</BadgeContainer>
	);
};
