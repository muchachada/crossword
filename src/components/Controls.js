import React from 'react'
import _ from 'lodash'

export default class Controls extends React.Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange () {
    const newWords = this.refs.input.value.split(' ')
    if (!_.isEqual(newWords, this.state.words)) {
      this.state.words = newWords
      this.props.onChange(newWords)
    }
  }

  render () {
    const { onChange } = this.props
    return (
      <div>
        <input type='text' ref='input' onChange={(e) => {onChange(e.target.value.split(' '))}}/>
      </div>
    )
  }
}
