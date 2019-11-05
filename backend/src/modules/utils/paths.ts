import path from 'path';
import fs from 'fs';

const rootDir = fs.realpathSync(process.cwd());
const joinDir = (relativePath: string) => path.join(rootDir, relativePath);

export {joinDir};
