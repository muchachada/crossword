import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button'
import { spring, Motion, presets } from 'react-motion'
import { Board } from './crossword'
import Controls from './components/Controls'
import BoardComponent from './components/Board'
import 'react-toolbox/lib/commons.scss'
import './index.css'

export default class App extends Component {
  constructor () {
    super()
    this.changeWords = this.changeWords.bind(this)
    this.state = {
      words: ['hola']
    }
  }

  changeWords (newWords) {
    if (!_.isEqual(newWords, this.state.words)) {
      this.setState({
        words: newWords
      })
    }
  }

  render() {
    const b = Board.from_words(this.state.words)
    const arr = b.toArray()
    return (
      <div className="App">
        <Controls onChange={this.changeWords} />
        <BoardComponent arr={arr} />
      </div>
    )
  }
}
