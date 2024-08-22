import { BrowserWindow } from 'electron'
import axios from 'axios'
import type { ResponseType } from 'axios'
import path from 'path'

export const downloadFile = (url: string, method: string = 'get'): Promise<ResponseType> => {
    return axios({
        url,
        method,
        responseType: 'stream'
    })
}

export function createBgWindow(url: string): BrowserWindow {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false, // 无边框
      fullscreen: true, // 全屏
    });

    const filePath = path.join(__dirname, 'index.html')
    const _url = `file://${filePath}#/dynamic-paper?path=${url}`;
    console.log(_url)
  
    win.loadURL(_url);

    return win
  }
  
