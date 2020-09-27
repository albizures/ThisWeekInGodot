module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: ['./public/**/*.html', './src/**/*.mdx', './src/**/*.tsx'],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			body: ['Roboto', 'sans-serif'],
			heading: ['Archivo Black', 'sans-serif'],
		},
		extend: {},
	},
	variants: {},
	plugins: [],
};
