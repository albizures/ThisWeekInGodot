import React from 'react';
import { Sections } from '../types';

interface Props {
	label: string;
	link: string;
	author: string;
	description?: string;
	date?: string;
	publisher: string;
	icon: string;
	cover?: string;
	section: Sections;
}

export const Card: React.FC<Props> = (props) => {
	let {
		label,
		author,
		publisher,
		description,
		icon,
		cover,
		link,
		section,
	} = props;

	// @ts-ignore
	const isMail = process.env.NODE_ENV === 'email';

	if (isMail) {
		if (description && description.length > 90) {
			description = description.substr(0, 90) + '…';
		}

		const withDescription = Boolean(
			[
				Sections.MadeWithGodot,
				Sections.LibrariesAssetsAddOns,
			].includes(section) && description.trim(),
		);
		return (
			<>
				<a
					href={link}
					target="_blank"
					className="text-sm md:text-lg font-heading leading-tight"
				>
					{label.trim()}
					{withDescription && `: ${description}`}
				</a>
				<p className="mb-1 author font-bold text-xxs md:text-xs whitespace-no-wrap">
					<span className="text-gray-700">by</span>{' '}
					<span>{author}</span>{' '}
					<span className="text-gray-700">in</span>{' '}
					<span>{publisher}</span>
				</p>
			</>
		);
	}

	let clickData = (section || '').replace(' ', '-').replace("'", '');

	clickData = `external-${clickData}`;

	return (
		<div
			className={
				'grid pb-8' + (cover ? ' grid-cols-3' : ' grid-cols-1')
			}
		>
			<div className={'pr-2 ddd' + (cover ? ' col-span-2' : '')}>
				<p className="mb-1 author font-bold text-xxs md:text-xs whitespace-no-wrap">
					<img
						className="w-4 h-4 inline-block mr-1"
						src={icon}
						alt={publisher}
					/>
					<span>{author}</span>{' '}
					<span className="text-gray-700">in</span>{' '}
					<span>{publisher}</span>
				</p>
				<a
					href={link}
					target="_blank"
					data-goatcounter-click={clickData}
					className="line-clamp-3 md:line-clamp-2 text-sm md:text-lg font-heading leading-tight overflow-hidden"
				>
					{label}
				</a>
				{description && (
					<a
						href={link}
						target="_blank"
						data-goatcounter-click={clickData}
						className="text-gray-700 line-clamp-1 text-xs overflow-hidden"
					>
						{description}
					</a>
				)}
				{/* {date && (
					<p className="text-xxs md:text-xs text-gray-700 leading-none">
						{format(new Date(date), 'MMM dd')}
					</p>
				)} */}
			</div>
			{cover && (
				<div>
					<a
						href={link}
						target="_blank"
						data-goatcounter-click={clickData}
						className="bg-center block bg-contain bg-no-repeat w-full h-full"
						style={{ backgroundImage: `url('${cover}')` }}
					/>
				</div>
			)}
		</div>
	);
};
