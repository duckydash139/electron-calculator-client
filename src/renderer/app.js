import React, { Component } from 'react'
import { Operator, TextField, CloudDrive } from './components'
import { ipcRenderer } from 'electron'

import ipc from './ipc'
import bus from './store'
import { Calculator, Cloud } from '../bloc/'

ipc.init()
const cal = new Calculator()
const cloudDrive = new Cloud()

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      a: '',
      b: '',
      result: 0,
      operator: null,
      drive: false
    }

    this.handleEvent = this.handleEvent.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  handleEvent (event) {
    const value = event.type === 'checkbox' ? event.checked : event.value
    this.setState({ [event.name]: value })

    this.setState(props => {
      if (event.name === 'operator') {
        return {
          result: cal[props.operator](props.a, props.b)
        }
      }
    })
  }

  onLoad () {
    if (this.state.drive) {
      const { a, b, operator, result } = cloudDrive.load()
      this.setState({ a, b, operator, result })
    } else {
      ipcRenderer.send('open-file-dialog')
    }
  }

  onSave () {
    if (this.state.drive) {
      const isSaved = cloudDrive.save()

      if (isSaved) {
        const status = document.getElementById('status')
        status.innerHTML = 'Saved!'
        status.className = 'has-text-success'
      }
    } else {
      ipcRenderer.send('save-dialog', {
        a: this.state.a,
        b: this.state.b,
        operator: this.state.operator,
        result: this.state.result
      })
    }
  }

  componentDidMount () {
    bus.on('loadedFile', ({ a, b, operator, result }) => {
      this.setState({ a, b, operator, result })
    })
  }

  render () {
    return (
      <div><br />
        <TextField name="a" placeholder="0" value={this.state.a} changeValue={this.handleEvent} />
        <TextField name="b" placeholder="0" value={this.state.b} changeValue={this.handleEvent} />
        <Operator active={this.state.operator} changeValue={this.handleEvent} />
        <TextField type="text" name="result" value={this.state.result} handleChange={this.handleEvent} readOnly />
        <CloudDrive checked={this.state.drive} changeValue={this.handleEvent} /><br /><br />
        <div>
          <span id="status">&nbsp;</span>
          <div className="is-pulled-right">
            <button className="button is-warning" name="load" onClick={this.onLoad}>Load</button>&nbsp;
            <button className="button is-info" name="save" onClick={this.onSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}
