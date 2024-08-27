// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, IpcRendererEvent } from 'electron';
import type { SetOptions } from 'wallpaper'
import type { SetPaperPicOption, SaveFileOption } from '_types/pic'

/** Notify main the renderer is ready. */
function rendererReady() {
  ipcRenderer.send('renderer-ready');
}
function setWallpaper(url: string, options: SetOptions & SetPaperPicOption): Promise<void> {
  return ipcRenderer.invoke('set-wallpaper', url, options)
}
function setVideo2Wallpaper(url: string): Promise<number> {
  return ipcRenderer.invoke('set-video-to-wallpaper', url)
}

function saveFile(url: string, options: SetPaperPicOption): Promise<Record<string, string>> {
  return ipcRenderer.invoke('save-file', url, options)
}

function hasFile(options: SaveFileOption): Promise<boolean | string> {
  return ipcRenderer.invoke('has-file', options)
}

function onSetVideoPaper(cb: (e: IpcRendererEvent, videoPath: string) => void) {
  ipcRenderer.on('set-video-paper', cb)
}

function closeWin(winId: number) {
  ipcRenderer.invoke('close-win', winId)
}

export default { rendererReady, setWallpaper, setVideo2Wallpaper, saveFile, onSetVideoPaper, hasFile, closeWin };
