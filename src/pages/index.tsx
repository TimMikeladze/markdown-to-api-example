import { MarkdownAPI, ParsedFile, Tag } from 'markdown-to-api';
import { gql } from 'graphql-request';
import useSWR from 'swr';
import config from '@/util/MarkdownAPI';
import { useState } from 'react';
import useDebounce from '@/util/useDebounce';
import Link from 'next/link';
import { DateTime } from 'luxon';

interface PageProps {
  count: number;
  files: ParsedFile[];
  tags: Tag[];
}

const SearchQuery = gql`
  query SearchMarkdownFiles($text: String!) {
    searchMarkdownFiles(text: $text) {
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
      }
    }
  }
`;

const SearchTagsQuery = gql`
  query SearchMarkdownFiles($text: String!) {
    searchMarkdownFiles(text: $text, options: { fields: ["tags"] }) {
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
      }
    }
  }
`;

const Page = (props: PageProps) => {
  const [text, setText] = useState(``);
  const debouncedText = useDebounce(text, 250);
  const [tags, setTags] = useState<string[]>([]);

  const { data } = useSWR(
    tags.length > 0
      ? [
          SearchTagsQuery,
          {
            text: tags.join(` `),
          },
        ]
      : debouncedText.trim().length
      ? [
          SearchQuery,
          {
            text: debouncedText,
          },
        ]
      : null,
  );

  const handleSelectTag = (tag: Tag) => {
    setText(``);
    if (tags.includes(tag.id)) {
      setTags(tags.filter((t) => t !== tag.id));
    } else {
      setTags([...tags, tag.id]);
    }
  };

  const results = (data?.searchMarkdownFiles?.results || props.files).map(
    (file: ParsedFile) => (
      <div key={file.id}>
        <div className="title">
          <Link href={`/${file.id}`}>{file.title}</Link>
        </div>
        <div className="id">ID: {file.id}</div>
        <div className="date">
          Created at:{` `}
          {DateTime.fromISO(file.createdAt).toLocaleString(DateTime.DATE_MED)}
        </div>
        <div className="tags">
          {file.tags.map((tag) => (
            <div
              className={`tag ${tags.includes(tag.id) ? `tag-selected` : ``}`}
              key={tag.id}
              onClick={() => handleSelectTag(tag)}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="description">{file.description}</div>
      </div>
    ),
  );

  return (
    <div className="content">
      <div>
        <input
          name="search"
          autoFocus
          placeholder={`Search ${props.count} markdown files...`}
          className="input"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="tags">
          {props.tags.map((tag) => (
            <div
              className={`tag ${tags.includes(tag.id) ? `tag-selected` : ``}`}
              key={tag.id}
              onClick={() => handleSelectTag(tag)}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div className="results">{results}</div>
    </div>
  );
};

export default Page;

const mdapi = new MarkdownAPI(config);

export const getServerSideProps = async () => {
  return {
    props: {
      count: mdapi.countFiles(),
      files: mdapi.getFiles(`title`, `asc`, 10),
      tags: mdapi.getTags(),
    },
  };
};
