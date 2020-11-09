<img width="250" src="https://raw.githubusercontent.com/albizures/ThisWeekInGodot/master/public/godot_logo.png" />
<h1 align="center" style="font-size: 6em">This Week in Godot</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/c6f44d34-0570-4ca0-9d3d-cabdaa2b3afb/deploy-status)](https://app.netlify.com/sites/nextjs-netlify-blog-template/deploys)
[![MADE BY Next.js](https://img.shields.io/badge/MADE%20BY%20Next.js-000000.svg?style=flat&logo=Next.js&labelColor=000)](https://nextjs.org/)

## How to create a new issue?

Create a new file inside of the folder `./src/pages/posts`, name the file `issue-#.mdx`, where `#` is the number of the current week. Use the latest issue as a template, leaving each section empty of the issue and adding the `draft` tag.

## How to publish an issue

The publish process is divided in two parts. First into the web, and for this it's only is necesarry to remove the draft tag and have it in the master branch. Second part for emails, and for this is necessary to generate the HTML.

### Who to generate HTML for emails

1. Remove any module import from the mdx files.
2. Make sure all the necessary components are being provided in `./src/generate-email.tsx`.
3. Run `yarn generate issue-1`, where `issue-1` is the name of the mdx file without the extension.
   - This step will generate the file `./dist/email.html`
4. Reverse changes in the mdx files
5. Send the generated HTML
   > Steps 1 and 4 are needed because at the time of writing this, there was a problem with MDX runtime and imports.

## Customization

This template is just a template and a boilerplate in which users can customize anything after the project was cloned and started.
The following instructions introduce common customization points like adding new metadata or applying a new design theme.

### Styling pages by a customized theme

All source codes related to the blog are under [components](https://github.com/wutali/nextjs-netlify-blog-template/tree/master/src/components), [pages](https://github.com/wutali/nextjs-netlify-blog-template/tree/master/src/pages), and
[layouts](https://github.com/wutali/nextjs-netlify-blog-template/tree/master/src/layouts) directory.
You can modify it freely if you want to apply your design theme.
All components use [styled-jsx](https://github.com/vercel/styled-jsx) and [css-modules](https://github.com/css-modules/css-modules) to define their styles, but you can choose any styling libraries for designing your theme.

The directory tree containing the blog source code are described below:

```
meta: yaml files defining metadata like authors or tags
public: images, favicons and other static assets
src
├── assets: other assets using inside of components
├── components: pieces of components consisting of pages
├── layouts: layout components for each post page
├── lib: project libraries like data fetching or pagination
└── pages: page components managing by Next.js
```

### Organizing content by categories

The category metadata that associates with content have the same relationship with the authors' one.
Then reference these implementations for adding new metadata:

- [public/admin/config.yml](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/public/admin/config.yml#L51): author metadata definition for Netlify CMS
- [src/lib/authors.tsx](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/src/lib/authors.ts): fetches metadata and defines utility functions for components
- [meta/authors.yml](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/src/meta/authors.yml): author content managed by Netlify CMS
- [layouts/index.tsx](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/src/layouts/index.tsx): displays author content for each page

You understood they have four steps to add the category metadata on your project after you read the above source codes:

1. Define the category metadata on the above Netlify config file
2. Create an empty file named with `categories.yml` under [meta](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/src/meta/) directory
3. Create a new module for fetching category metadata
4. Display the category metadata on [layouts](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/src/layouts/index.tsx#L71) or other components you want

It is all you have to do. After that, you can access Netlify CMS and create new categories at any time.

### Locale settings for Netlify CMS

Modify [config.yml](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/public/admin/config.yml) and
[index.html](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/public/admin/index.html) under [public/admin](https://github.com/wutali/nextjs-netlify-blog-template/blob/master/public/admin/) directory
as following instructions:

[Netlify CMS - Configuration Options #Locale](https://www.netlifycms.org/docs/configuration-options/#locale)

## License

MIT
