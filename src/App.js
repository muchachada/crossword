import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button'
import { spring, Motion, presets } from 'react-motion'
import { Board } from './crossword'
import Controls from './components/Controls'
import BoardComponent from './components/Board'
import AppBar from 'react-toolbox/lib/app_bar'
import 'react-toolbox/lib/commons.scss'
import './index.css'
import styles from './App.scss'
export default class App extends Component {
  constructor () {
    super()
    this.changeWords = this.changeWords.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete (i) {
    console.log(this.state.words.slice(0, i))
    console.log(this.state.words.slice(i + 1))
    this.setState({
      words: [...this.state.words.slice(0, i), ...this.state.words.slice(i + 1)]
    })
    console.log(this.state.words)
  }

  render() {
    const b = Board.from_words(this.state.words)
    const arr = b.toArray()
    return (
      <div className={styles.wrapper}>
        <AppBar title='Crossword generator' />
        <div className={styles.content}>
          <div className={styles.controls}>
            <Controls onChange={this.changeWords} words={this.state.words} onDelete={this.handleDelete} />
          </div>
          <div className={styles.board}>
            <BoardComponent arr={arr} />
          </div>
        </div>
      </div>
    )
  }
}
