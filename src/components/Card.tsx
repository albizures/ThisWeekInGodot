import React from 'react';
import { format } from 'date-fns';

interface Props {
	label: string;
	link: string;
	author: string;
	description: string;
	date?: string;
	publisher: string;
	icon: string;
	cover: string;
}

export const Card: React.FC<Props> = (props) => {
	const {
		label,
		author,
		publisher,
		description,
		icon,
		date,
		cover,
		link,
	} = props;
	return (
		<div className="grid grid-cols-3 pt-4">
			<div className="pr-2 col-span-2">
				<p className="font-bold text-xxs md:text-xs whitespace-no-wrap">
					<img
						className="w-4 h-4 inline-block mr-1"
						src={icon}
						alt={publisher}
					/>
					<span className="align-middle">{author}</span>{' '}
					<span className="text-gray-700">in</span> <span>{publisher}</span>
				</p>
				<a
					href={link}
					target="_blank"
					className="line-clamp-3 md:line-clamp-2 text-sm md:text-lg font-heading leading-tight overflow-hidden"
				>
					{label}
				</a>
				<a
					href={link}
					target="_blank"
					className="text-gray-700 line-clamp-1 text-xs overflow-hidden"
				>
					{description}
				</a>
				{date && (
					<p className="text-xxs md:text-xs text-gray-700 leading-none">
						{format(new Date(date), 'MMM dd')}
					</p>
				)}
			</div>
			<div>
				<a
					href={link}
					target="_blank"
					className="bg-center block bg-contain bg-no-repeat w-full h-full"
					style={{ backgroundImage: `url('${cover}')` }}
				/>
			</div>
		</div>
	);
};
