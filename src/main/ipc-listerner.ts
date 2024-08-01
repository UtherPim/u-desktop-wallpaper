import {ipcMain, IpcMainInvokeEvent, app} from "electron";
import type { SetOptions } from 'wallpaper'
import { setWallpaper } from 'wallpaper'
import axios from 'axios'
import { SetPaperPicOption } from '_types/pic'
import fs from 'fs'
import path from 'path'

ipcMain.on('renderer-ready', () => {
  // eslint-disable-next-line no-console
    console.log('Renderer is ready.');
});
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