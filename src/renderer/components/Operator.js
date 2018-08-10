import React, { Component } from 'react'

export default class Operator extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.highlightButton = this.highlightButton.bind(this)
  }
  handleClick (e) {
    this.props.changeValue(e.target)
  }

  highlightButton () {
    const root = document.querySelectorAll('[name=operator]')

    root.forEach(node => {
      if (node.value === this.props.active) {
        node.style.backgroundColor = 'cornflowerblue'
        node.style.color = 'white'
      } else {
        node.style.backgroundColor = ''
        node.style.color = 'black'
      }
    })
  }

  componentDidMount () {
    this.highlightButton()
  }

  componentDidUpdate () {
    this.highlightButton()
  }

  render () {
    return (
      <div className="columns is-mobile">
        <div className="column is-2" />
        <div className="column" onClick={this.handleClick}>
          <button className="button" name="operator" value="add">
            +
          </button>
          &nbsp;
          <button className="button" name="operator" value="substract">
            -
          </button>
          &nbsp;
          <button className="button" name="operator" value="multiply">
            *
          </button>
          &nbsp;
          <button className="button" name="operator" value="divide">
            /
          </button>
          &nbsp;
          <button className="button" name="operator" value="power">
            pow
          </button>
          &nbsp;
        </div>
      </div>
    )
  }
}
