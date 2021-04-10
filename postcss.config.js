const getPlugins = () => {
	if (process.env.NODE_ENV === 'email') {
		return {
			'postcss-import': {},
			tailwindcss: {},
			'@fullhuman/postcss-purgecss': {
				content: ['./src/**/*.tsx'],

				defaultExtractor: (content) => {
					const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

					const innerMatches =
						content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

					return broadMatches.concat(innerMatches);
				},
			},
			'postcss-custom-properties': {
				preserve: false,
			},
			'postcss-rem-to-pixel': {
				rootValue: 20,
				propList: ['*'],
			},
			autoprefixer: {},
			'postcss-css-variables': {},
		};
	}

	return ['tailwindcss', 'postcss-preset-env'];
};

module.exports = {
	plugins: getPlugins(),
};
