export const PREVIEW_DOMAIN = `markdown-to-api-example.vercel.app`;

export const PRODUCTION_DOMAIN = PREVIEW_DOMAIN;

export const DEFAULT_QUERY = `query SearchMarkdownFiles {
  searchMarkdownFiles(text: "bengal", options: {
    fields: "title"
  }) {
    count
    results {
      id
      title
      description
      createdAt
      tags {
        id
        name
        description
      }
      markdownFile {
        content
      }
    }
  }
}`;
