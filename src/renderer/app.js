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
    this.status = React.createRef()
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

  async onLoad () {
    if (this.state.drive) {
      bus.emit('status', ['Loading!..'])
      const data = await cloudDrive.load()

      if (data) {
        const { a, b, operator, result } = data
        this.setState({ a, b, operator, result })

        bus.emit('status', ['Loaded!', 'has-text-success'])
      } else {
        bus.emit('status', ['Cannot load the data at this time', 'has-text-danger'])
      }
    } else {
      ipcRenderer.send('open-file-dialog')
    }
  }

  async onSave () {
    if (this.state.drive) {
      bus.emit('status', ['Loading!..'])
      const isSaved = await cloudDrive.save({
        a: this.state.a,
        b: this.state.b,
        operator: this.state.operator,
        result: this.state.result
      })

      if (isSaved) {
        bus.emit('status', ['Saved!', 'has-text-success'])
      } else {
        bus.emit('status', ['Cannot save the data at this time', 'has-text-danger'])
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
    bus.on('status', ([ status, className ]) => {
      this.status.current.innerHTML = status
      this.status.current.className = className
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
          <span ref={this.status}>&nbsp;</span>
          <div className="is-pulled-right">
            <button className="button is-warning" name="load" onClick={this.onLoad}>Load</button>&nbsp;
            <button className="button is-info" name="save" onClick={this.onSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}
