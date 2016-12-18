import React from 'react'
import Chip from 'react-toolbox/lib/chip'
import styles from './EditableChip.scss'
import { getWidth } from './dynamic-width'

export default class EditableChip extends React.Component {
  constructor () {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getFocus = this.getFocus.bind(this)
  }

  handleKeyDown (e) {
    if (['Tab', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      this.props.onOK()
    }
    if (e.key === 'Backspace' && this.props.value === '') {
      e.preventDefault()
      this.props.onLastBackspace()
    }
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  getFocus () {
    console.log(this.refs.input)
    this.refs.input.focus()
  }

  render () {
    return (
      <Chip theme={{chip: styles.chip}}>
        <input
          ref='input'
          style={{width: getWidth(this.props.value)}}
          className={styles.input}
          value={this.props.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </Chip>
    )
  }
}
