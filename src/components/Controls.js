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

  changeInput (v) {
    console.log(v)
    this.setState({input: v})
  }

  render () {
    const { words, onDelete } = this.props
    return (
      <div>
        <form onSubmit={this.addWord}>
          <Input type='text' value={this.state.input} onChange={this.changeInput} />
          <Button type='submit' onClick={this.addWord} label='Add' primary raised />
        </form>
        <div>
          {words.map((w, i) => <Chip key={w} deletable onDeleteClick={() => onDelete(i)}>{w}</Chip>)}
        </div>
      </div>
    )
  }
}
