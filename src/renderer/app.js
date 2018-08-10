import React, { Component } from 'react'
import { Operator, TextField, CloudDrive } from './components'

import { Calculator } from '../bloc/'

const cal = new Calculator()

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      a: 0,
      b: 0,
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

    }
  }

  onSave () {
    if (this.state.drive) {

    }
  }

  render () {
    return (
      <div><br/>
        <TextField name="a" value={this.state.a} changeValue={this.handleEvent} />
        <TextField name="b" value={this.state.b} changeValue={this.handleEvent} />
        <Operator active={this.state.operator} changeValue={this.handleEvent} />
        <TextField type="text" name="result" value={this.state.result} handleChange={this.handleEvent} readOnly />
        <CloudDrive checked={this.state.drive} changeValue={this.handleEvent} /><br /><br />
        <div className="is-pulled-right">
          <button className="button is-warning" name="load" onClick={this.onLoad}>Load</button>&nbsp;
          <button className="button is-info" name="save" onClick={this.onSave}>Save</button>
        </div>
      </div>
    )
  }
}
