import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { startMailSender } from './mailsender';
import fs from 'fs';
import { appPath, getContentFilePath, privateConfigFilePath } from './utils/file-paths';
import { shutdown } from './shutdown';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 920,
    title: 'Pypenschuch Bot',
    show: false,
    icon: appPath + '/resources/icon.ico',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    // open Dev Tools if running in development
    if (is.dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC
  ipcMain.on('run-mailer', (event, mailerArgs) => startMailSender(event, mailerArgs));

  // Save content data into txt file
  ipcMain.on('save-data', (event, args) => {
    const { contentText, index } = args;
    const contentFilePath = getContentFilePath(index);
    console.log('Saving data to', contentFilePath);
    fs.writeFile(contentFilePath, contentText, (err) => {
      if (err) {
        console.error('Failed to save data', err);
        return;
      }
      console.log('Data saved successfully.');
    });
  });

  ipcMain.on('save-private-config-json', (event, data) => {
    const configObject = {
      mailcredentials: data.mailcredentials ?? [],
      min: data.min || 20,
      max: data.max || 120
    };
    // pretty print the json string
    const configJsonString = JSON.stringify(configObject, null, 2);
    fs.writeFile(privateConfigFilePath, configJsonString, (err) => {
      if (err) {
        console.error('Failed to save data', err);
        return;
      }
      console.log('Data saved successfully.');
    });
  });

  ipcMain.on('shutdown', (event) => shutdown(event));

  ipcMain.handle('get-app-path', async () => {
    return appPath;
  });

  createWindow();

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
