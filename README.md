## Features

- **Tagging**: organizes content by tags
- **Author**: displays author names who write a post
- **Pagination**: limits the number of posts per page
- **CMS**: built with CMS to allow editors modifying content with the quickest way
- **SEO optimized**: built-in metadata like JSON-LD
- **Shortcode**: extends content writing with React component like WordPress shortcodes

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Netlify](https://www.netlify.com/)
- [MDX](https://mdxjs.com/)

### Organizing content by categories

The category metadata that associates with content have the same relationship with the authors' one.
Then reference these implementations for adding new metadata:

- [public/admin/config.yml](/public/admin/config.yml#L51): author metadata definition for Netlify CMS
- [src/lib/authors.tsx](/src/lib/authors.ts): fetches metadata and defines utility functions for components
- [meta/authors.yml](/src/meta/authors.yml): author content managed by Netlify CMS
- [src/components/PostLayout.tsx](/src/components/PostLayout.tsx): displays author content for each page

You understood they have four steps to add the category metadata on your project after you read the above source codes:

1. Define the category metadata on the above Netlify config file
2. Create an empty file named with `categories.yml` under [meta](/src/meta/) directory
3. Create a new module for fetching category metadata
4. Display the category metadata on [src/components/PostLayout.tsx](/src/components/PostLayout.tsx#L75) or other components you want

It is all you have to do. After that, you can access Netlify CMS and create new categories at any time.

### Locale settings for Netlify CMS

Modify [config.yml](/public/admin/config.yml) and
[index.html](/public/admin/index.html) under [public/admin](/public/admin/) directory
as following instructions:

[Netlify CMS - Configuration Options #Locale](https://www.netlifycms.org/docs/configuration-options/#locale)

## References

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/intro/)
- [Building a Markdown blog with Next 9.4 and Netlify](https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.4-and-netlify/)
- [Hugo Theme - Codex](https://github.com/jakewies/hugo-theme-codex)
- [Next.js Starter Template for TypeScript](https://github.com/vercel/next-learn-starter/tree/master/typescript-final)
- [Building Blog with NextJS and Netlify CMS](https://dev.to/mefaba/building-blog-with-nextjs-and-netlify-cms-fom)
- [Unicons](https://github.com/Iconscout/unicons)

## License

MIT
