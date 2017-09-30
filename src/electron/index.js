import { app, BrowserWindow } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'

import { setApplicationMenu } from './menu'

let browserWindow = null

const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.bundle.js')
    }
  })
  browserWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  browserWindow.on('closed', () => {
    browserWindow = null
  })
}

app.on('ready', () => {
  setApplicationMenu()
  createWindow()
  autoUpdater.checkForUpdates()
})

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow()
  }
})
