import { ipcRenderer } from 'electron'
import bus from './store'

function init () {
  ipcRenderer.on('saved-file', () => {
    const status = document.getElementById('status')
    status.innerHTML = 'Saved!'
    status.className = 'has-text-success'
  })

  ipcRenderer.on('selected-file', (event, data) => {
    if (data.a && data.b && data.operator && data.result) {
      const status = document.getElementById('status')
      status.innerHTML = 'Loaded!'
      status.className = 'has-text-success'

      bus.emit('loadedFile', data)
    } else {
      const status = document.getElementById('status')
      status.innerHTML = 'Cannot read the file!'
      status.className = 'has-text-danger'
    }
  })

  ipcRenderer.on('not-allowed-extension', (event) => {
    const status = document.getElementById('status')
    status.innerHTML = 'Cannot read the file!'
    status.className = 'has-text-danger'
  })
}

export default { init }
