import { ipcRenderer } from 'electron'
import bus from './store'

function init () {
  ipcRenderer.on('saved-file', () => {
    bus.emit('status', ['Saved!', 'has-text-success'])
  })

  ipcRenderer.on('selected-file', (event, data) => {
    if (data.a && data.b && data.operator && data.result) {
      bus.emit('loadedFile', data)

      bus.emit('status', ['Loaded!', 'has-text-success'])
    } else {
      bus.emit('status', ['Cannot read the file!', 'has-text-danger'])
    }
  })

  ipcRenderer.on('not-allowed-extension', (event) => {
    bus.emit('status', ['Cannot read the file!', 'has-text-danger'])
  })
}

export default { init }
