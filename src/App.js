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
  }

  componentDidUpdate () {
    const board = document.querySelector('.' + styles.board)
    const boardInner = document.querySelector('.' + styles.boardInner)
    const boardHeight = board.clientHeight
    const boardWidth = board.clientWidth
    const boardInnerHeight = boardInner.clientHeight
    const boardInnerWidth = boardInner.clientWidth
    const verticalRatio = boardInnerHeight / boardHeight
    const horizontalRatio = boardInnerWidth / boardWidth
    const biggestRatio = Math.max(verticalRatio, horizontalRatio)
    console.log(biggestRatio)
    if (biggestRatio > 1) {
        const scale = 1 / biggestRatio
        let translate = 0
        translate = Math.max(boardInnerHeight - boardHeight, 0)
        console.log(translate)
        boardInner.style.transform = `scale(${scale}) translateY(-${translate}px)`
      }
    }

  render() {
    let board = Board.from_words(this.state.words)
    for (var i = 0; i < 5; i++) {
      let b = Board.from_words(this.state.words)
      if (b.score > board.score) {
        board = b
      }
    }
    const arr = board.toArray()
    return (
      <div className={styles.wrapper}>
        <AppBar title='Crossword generator' />
        <div className={styles.content}>
          <div className={styles.controls}>
            <h4>Words</h4>
            <Controls onChange={this.changeWords} words={this.state.words} onDelete={this.handleDelete} onLastBackspace={() => this.setState({words: this.state.words.slice(0, this.state.words.length - 1)})}/>
            <h4>Debug data</h4>
            <div>
              <div><strong>Size:</strong> {board.size.x} × {board.size.y}</div>
              <div><strong>Fullness:</strong> {board.fullness.toFixed(2)}</div>
              <div><strong>Squareness:</strong> {board.squareness.toFixed(2)}</div>
              <div><strong>Score:</strong> {board.score.toFixed(2)}</div>
            </div>
          </div>
          <div className={styles.board}>
            <div className={styles.boardInner}>
              <BoardComponent arr={arr} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
