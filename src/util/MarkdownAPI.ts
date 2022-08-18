import isDev from '@/util/isDev';
import { join } from 'path';

const config = {
  directory: join(process.cwd(), `markdown`),
  writeIndex: isDev(),
  useIndex: !isDev(),
};

export default config;
