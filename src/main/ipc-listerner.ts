import {ipcMain, IpcMainInvokeEvent, app, BrowserWindow} from "electron";
import type { SetOptions } from 'wallpaper'
import { setWallpaper } from 'wallpaper'
import axios from 'axios'
import { SetPaperPicOption, SaveFileOption } from '_types/pic'
import fs from 'fs'
import path from 'path'
import {attach, detach, refresh} from "electron-as-wallpaper";
import { createBgWindow } from '../utils'

export const mainWinListerner =  function(mainWin?: BrowserWindow) {

  if(!mainWin) {
    mainWin = BrowserWindow.fromId(global.mainWinId) || undefined
  }

  if(!mainWin) return;

  ipcMain.on('renderer-ready', () => {
    // eslint-disable-next-line no-console
      console.log('Renderer is ready.');
  });

  ipcMain.handle('close-main-win', (e: IpcMainInvokeEvent) => {
    mainWin?.close()
  })

  ipcMain.handle('max-main-win', (e: IpcMainInvokeEvent) => {
    mainWin?.maximize()
  })

  ipcMain.handle('unmax-main-win', (e: IpcMainInvokeEvent) => {
    mainWin?.unmaximize()
  })

  ipcMain.handle('min-main-win', (e: IpcMainInvokeEvent) => {
    mainWin?.minimize()
  })

  ipcMain.handle('restore-main-win', (e: IpcMainInvokeEvent) => {
    mainWin?.restore()
  })

}

ipcMain.handle('close-win', (e: IpcMainInvokeEvent, winId: number) => {
  const win = BrowserWindow.fromId(winId)
  win?.close()
})

ipcMain.handle('set-wallpaper', async (e: IpcMainInvokeEvent, url: string, options: SetOptions & SetPaperPicOption) => {
  const { from, filename } = options
  return axios.get(url, { responseType: 'arraybuffer' })
  .then(async (response) => {
    const imgPath = path.join(app.getPath('appData'), 'u-desktop', from + '-pic', filename || `bing-${new Date().getTime()}.jpg`)
    try {
      fs.writeFileSync(imgPath, Buffer.from(response.data));
    }catch(e) {
      console.log(imgPath, e)
    }
    await setWallpaper(imgPath, options)
    console.log('Image saved to:', imgPath);
  })
})

ipcMain.handle('set-video-to-wallpaper', async (e: IpcMainInvokeEvent, url: string) => {
  const win = createBgWindow(url)
  attach(win, {
    transparent: true,
    forwardKeyboardInput: true,
    forwardMouseInput: true,
  });
  
  return win.webContents.id
})

ipcMain.handle('save-file', async (e: IpcMainInvokeEvent, url: string, options: SaveFileOption) => {
  const { from, filename } = options
  return axios.get(url, { responseType: 'stream' }).then(async response => {
    const filePath = path.join(app.getPath('appData'), 'u-desktop', from + '-pic', filename)
    
    const writestream = fs.createWriteStream(filePath)
    response.data.pipe(writestream)

    return new Promise((resolve, reject) => {
      writestream.on('finish', () => {
        resolve({ filePath })
      });
      writestream.on('error', reject);
    });
    
  })
})

ipcMain.handle('has-file', (e: IpcMainInvokeEvent, options: SaveFileOption) => {
  const { from, filename } = options
  const filePath = path.join(app.getPath('appData'), 'u-desktop', from + '-pic', filename)
  return new Promise((resolve, reject) => {
    try{
      if(fs.existsSync(filePath)) {
        resolve(filePath)
      }else {
        resolve(false)
      }
    }catch(e) {
      reject(e)
    }
  })
}) 