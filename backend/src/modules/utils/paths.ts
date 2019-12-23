import path from 'path';
import fs from 'fs';

const rootDir = fs.realpathSync(process.cwd());
const resolveDir = (relativePath: string) => path.resolve(rootDir, relativePath);

export {resolveDir};
