// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import type { SetOptions } from 'wallpaper'
import type { SetPaperPicOption } from '_types/pic'

/** Notify main the renderer is ready. */
function rendererReady() {
  ipcRenderer.send('renderer-ready');
}
function setWallpaper(url: string, options: SetOptions & SetPaperPicOption): Promise<void> {
  return ipcRenderer.invoke('set-wallpaper', url, options)
}

export default { rendererReady, setWallpaper };
