import React from 'react'
import _ from 'lodash'
import Chip from 'react-toolbox/lib/chip'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

export default class Controls extends React.Component {
  constructor () {
    super()
    this.addWord = this.addWord.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.state = {
      input: ''
    }
  }

  addWord (e) {
    e.preventDefault()
    const word = this.state.input
    this.setState({input: ''})
    const { words, onChange } = this.props
    onChange(_.concat(words, word))
  }

  changeInput (e) {
    this.setState({input: e.target.value})
  }

  render () {
    const { words, onDelete } = this.props
    return (
      <div>
        <div>
          {words.map((w, i) => <Chip key={w} deletable onDeleteClick={() => onDelete(i)}>{w}</Chip>)}
          <form onSubmit={this.addWord} style={{display: 'inline'}}>
            <input type='text' style={{width: '3em'}} value={this.state.input} onChange={this.changeInput} ref='input' />
          </form>
        </div>
      </div>
    )
  }
}
