import { app } from 'electron';
import path from 'path';
import fileConfig from '../../../file.config';

const isDevelopment = !app.isPackaged;

export const appPath = isDevelopment
  ? path.join(app.getAppPath())
  : path.join(process.resourcesPath);

export const contentFilePath = path.join(appPath, 'resources', `${fileConfig.contentFileName}.txt`);

export const privateConfigFilePath = path.join(
  appPath,
  'resources',
  `${fileConfig.privateConfigFileName}.json`
);
