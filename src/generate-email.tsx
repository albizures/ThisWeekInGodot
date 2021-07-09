import fs from 'fs';
import inlineCSS from 'inline-css';
import { compileFile, Layouts, absolutePaths } from './compile-mdx';

const name = process.argv[2];

const basePath = './src/pages/posts';
const postPath = `${basePath}/${name}.mdx`;

if (!fs.statSync(postPath).isFile()) {
	throw new Error(`Invalid name: ${name}`);
}

// @ts-ignore
process.env.NODE_ENV = 'email';

inlineCSS(compileFile(postPath, Layouts.email), {
	url: `file://${process.cwd()}/`,
	applyLinkTags: true,
	removeHtmlSelectors: true,
})
	.then(absolutePaths)
	.then((html: string) => fs.writeFileSync('./dist/email.html', html));
