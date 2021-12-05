import React from 'react';

export const DraftBanner: React.FC = () => {
	return (
		<div className="draft-banner p-4 mt-4 rounded bg-orange-200 border border-orange-300">
			<p className="m-0">
				Hey there! This issue is still a draft. Please if you find any
				mistake or have any recommendation or request, please let me
				know through an email (
				<a
					className="underline text-indigo-800"
					href="mailto:albizures@vk.com"
				>
					albizures@vk.com
				</a>
				), or even better, you can make a PR at{' '}
				<a
					className="underline text-indigo-800"
					href="https://github.com/albizures/ThisWeekInGodot"
				>
					GitHub
				</a>{' '}
				🤗
			</p>
		</div>
	);
};
