import { ipcMain, dialog } from 'electron'
import fs from 'fs'

function init () {
  ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
      filters: [
        { extensions: ['json'] }
      ]
    }, (files) => {
      if (files) {
        const fileExtension = files[0].split('.')[1]

        if (fileExtension === 'json') {
          fs.readFile(files[0], (error, data) => {
            if (error) throw error
            event.sender.send('selected-file', JSON.parse(data))
          })
        } else {
          event.sender.send('not-allowed-extension')
        }
      }
    })
  })

  ipcMain.on('save-dialog', (event, data) => {
    const options = {
      title: 'Save data',
      filters: [
        { name: 'data', extensions: ['json'] }
      ]
    }
    dialog.showSaveDialog(options, (filename) => {
      if (filename) {
        fs.writeFile(filename, JSON.stringify(data), (error) => {
          if (error) throw error
          event.sender.send('saved-file')
        })
      }
    })
  })
}

export default { init }
