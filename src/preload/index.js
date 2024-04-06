import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import path from 'path'
import fileConfig from '../../file.config'

const readFileContents = async () => {
  const appPath = await ipcRenderer.invoke('get-app-path')
  const filePath = path.join(appPath, `resources/${fileConfig.contentFileName}.txt`)
  try {
    return fs.readFileSync(filePath, { encoding: 'utf-8' })
  } catch (error) {
    console.error('Error reading file:', error)
    return ''
  }
}

// Custom APIs for renderer
const api = {
  readFile: readFileContents
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
