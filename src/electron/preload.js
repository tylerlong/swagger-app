import electron from 'electron'
import fs from 'fs'

process.once('loaded', () => {
  global.electron = electron.remote
  global.fs = fs
})
