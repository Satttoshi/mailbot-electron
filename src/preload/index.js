import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import fs from 'fs';
import path from 'path';
import fileConfig from '../../file.config';

const readContentFile = async (contentFileIndex) => {
  const appPath = await ipcRenderer.invoke('get-app-path');
  const filePath = path.join(
    appPath,
    'resources',
    `${fileConfig.contentFileName}-${contentFileIndex}.txt`
  );
  try {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
  } catch (error) {
    console.error('Error reading file:', error);
    return '';
  }
};

const readPrivateConfigFile = async () => {
  const appPath = await ipcRenderer.invoke('get-app-path');
  const filePath = path.join(appPath, `resources/${fileConfig.privateConfigFileName}.json`);
  try {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
  } catch (error) {
    console.error('Error reading file:', error);
    return '';
  }
};

// Custom APIs for renderer
const api = {
  readContentFile,
  readPrivateConfigFile
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}

// create content file txt if there is none
const createContentFile = async (index) => {
  const appPath = await ipcRenderer.invoke('get-app-path');
  const filePath = path.join(appPath, 'resources', `${fileConfig.contentFileName}-${index}.txt`);
  try {
    fs.writeFileSync(filePath, 'Insert your mail content here...', 'utf-8');
  } catch (error) {
    console.error('Error creating file:', error);
  }
};

const createContentFiles = async () => {
  const appPath = await ipcRenderer.invoke('get-app-path');
  for (let i = 0; i < 10; i++) {
    const filePath = path.join(appPath, 'resources', `${fileConfig.contentFileName}-${i}.txt`);
    if (!fs.existsSync(filePath)) {
      createContentFile(i).catch(console.error);
    }
  }
};

createContentFiles().catch(console.error);
