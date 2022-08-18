import { MarkdownAPI, ParsedFile } from 'markdown-to-api';
import { useRemarkSync } from 'react-remark';
import config from '@/util/MarkdownAPI';

interface PageProps {
  file: ParsedFile;
}

const Page = (props: PageProps) => {
  const content = useRemarkSync(props.file.content);

  return <div className="content">{content}</div>;
};

export default Page;

const mdapi = new MarkdownAPI(config);

export const getStaticPaths = mdapi.getStaticPaths();

export const getStaticProps = mdapi.getStaticProps();
