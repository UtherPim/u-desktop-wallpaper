import {ipcMain} from "electron";

ipcMain.on('renderer-ready', () => {
  // eslint-disable-next-line no-console
    console.log('Renderer is ready.');
});