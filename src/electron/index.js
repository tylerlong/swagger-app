import { app, BrowserWindow, dialog, shell } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

import { setApplicationMenu } from './menu'

log.transports.file.level = 'info'
autoUpdater.logger = log
autoUpdater.checkForUpdatesAndNotify()

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
  dialog.showMessageBox(browserWindow, { message: 'This app has been deprecated in favor of "Swagger Data Entry App", click OK to download it' })
  shell.openExternal('https://github.com/tylerlong/swagger-data-entry-app/releases')
  app.quit()
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
