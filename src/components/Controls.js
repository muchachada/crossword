import React from 'react'
import _ from 'lodash'
import Chip from 'react-toolbox/lib/chip'
import { Button } from 'react-toolbox/lib/button'
import EditableChip from './EditableChip'
import Input from 'react-toolbox/lib/input'

export default class Controls extends React.Component {
  constructor () {
    super()
    this.addWord = this.addWord.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.handleLastBackspace = this.handleLastBackspace.bind(this)
    this.state = {
      input: ''
    }
  }

  addWord () {
    const word = this.state.input
    this.setState({input: ''})
    const { words, onChange } = this.props
    onChange(_.concat(words, word))
    this.refs.editablechip.getFocus()
  }

  changeInput (v) {
    this.setState({input: v})
  }

  handleLastBackspace () {
    this.setState({input: this.props.words.slice(-1)[0]})
    this.props.onLastBackspace()
  }

  render () {
    const { words, onDelete } = this.props
    return (
      <div>
        <div>
          {words.map((w, i) => <Chip key={w} deletable onDeleteClick={() => onDelete(i)}>{w}</Chip>)}
          <EditableChip
            ref='editablechip'
            value={this.state.input}
            onChange={this.changeInput}
            onOK={this.addWord}
            onLastBackspace={this.handleLastBackspace}
          />
        </div>
      </div>
    )
  }
}
