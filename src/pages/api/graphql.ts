import apolloServer from '@/graphql/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({
    path: `/api/graphql`,
  })(req, res);
}
