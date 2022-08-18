import { ApolloError, ApolloServer } from 'apollo-server-micro';
import { createApplication } from 'graphql-modules';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import getAppUrl from '@/util/getAppUrl';
import { DEFAULT_QUERY } from '@/util/constants';
import { createMarkdownAPIModule } from 'markdown-to-api';
import config from '@/util/MarkdownAPI';

const markdownAPIModule = createMarkdownAPIModule(config);

const app = createApplication({
  modules: [markdownAPIModule],
});

const plugins = [
  ApolloServerPluginLandingPageGraphQLPlayground({
    tabs: [
      {
        endpoint: getAppUrl(`/api/graphql`),
        query: DEFAULT_QUERY,
      },
    ],
  }),
];

const apolloServer = new ApolloServer({
  typeDefs: app.typeDefs,
  resolvers: app.resolvers,
  executor: app.createApolloExecutor(),
  introspection: true,
  cache: `bounded`,
  formatError: (error: any) => {
    return new ApolloError(error.message, error.extensions.code);
  },
  plugins,
});

export default apolloServer;
