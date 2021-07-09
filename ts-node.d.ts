declare module '*authors.yml' {
	const data: {
		authors: {
			slug: string;
			name: string;
			introduction: string;
		}[];
	};

	export default data;
}

declare module '*tags.yml' {
	const data: {
		tags: {
			slug: string;
			name: string;
		}[];
	};

	export default data;
}
