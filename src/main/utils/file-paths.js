import { app } from 'electron';
import path from 'path';
import fileConfig from '../../../file.config';

const isDevelopment = !app.isPackaged;

export const appPath = isDevelopment
  ? path.join(app.getAppPath())
  : path.join(process.resourcesPath);

/**
 * @description Get the path of the content file with the given index.
 * E.g. content-0.txt, content-1.txt, etc.
 *
 * @param {number} index
 * @returns {string}
 */
export function getContentFilePath(index) {
  return path.join(appPath, 'resources', `${fileConfig.contentFileName}-${index}.txt`);
}

export const privateConfigFilePath = path.join(
  appPath,
  'resources',
  `${fileConfig.privateConfigFileName}.json`
);
