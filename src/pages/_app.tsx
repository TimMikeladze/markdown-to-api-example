import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import { request } from 'graphql-request';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (query: string, variables) =>
          request(`/api/graphql`, query, variables),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
