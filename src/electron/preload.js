const electron = require('electron')
const fs = require('fs')

process.once('loaded', () => {
  global.electron = electron.remote
  global.fs = fs
})
