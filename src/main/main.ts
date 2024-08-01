/**
 * Entry point of the Election app.
 */


import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, globalShortcut, Menu } from 'electron';
import * as nodeEnv from '_utils/node-env';
import './ipc-listerner';
import fs from 'fs'

const appDataPath = path.join(app.getPath('appData'), 'u-desktop')
const bingCachePath = path.join(appDataPath, 'bing-pic')
const wallhavenCachePath = path.join(appDataPath, 'wallhaven-pic')
const dynamicCachePath = path.join(appDataPath, 'dynamic-pic')

let mainWindow: Electron.BrowserWindow | undefined;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1440,
    hasShadow: true,
    frame: false,
    transparent: true,
    webPreferences: {
      devTools: nodeEnv.dev,
      preload: path.join(__dirname, './preload.bundle.js'),
      webSecurity: nodeEnv.prod,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html').finally(() => { /* no action */ });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  if (nodeEnv.dev || nodeEnv.prod) createWindow();
  nodeEnv.dev && mainWindow?.webContents.openDevTools()
  globalShortcut.register('CommandOrControl+O', () => {
    mainWindow?.webContents.openDevTools();
  });
  globalShortcut.register('CommandOrControl+R', () => {
    mainWindow?.reload();
  });
  Menu.setApplicationMenu(null);

  if(!fs.existsSync(appDataPath)) {
    try{
      fs.mkdirSync(appDataPath, { recursive: true })
      if(!fs.existsSync(bingCachePath))
      await fs.promises.mkdir(bingCachePath, { recursive: true })
      if(!fs.existsSync(wallhavenCachePath))
      await fs.promises.mkdir(wallhavenCachePath, { recursive: true })
      if(!fs.existsSync(dynamicCachePath))
      await fs.promises.mkdir(dynamicCachePath, { recursive: true })
    }catch(e) {
      console.log(e)
    }
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
}).finally(() => { /* no action */ });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// eslint-disable-next-line import/prefer-default-export
export const exportedForTests = nodeEnv.test ? { createWindow } : undefined;
