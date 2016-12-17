import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button'
import { spring, Motion, presets } from 'react-motion';

// Import react-toolbox resets
import 'react-toolbox/lib/commons.scss'

import './index.css'

export default class App extends Component {
  render() {
    const { arr } = this.props;
    return (
      <div className="App">
        <table>
        <Motion defaultStyle={{scale: 0}} style={{scale: spring(1, presets.gentle)}}>
          {value => {
            return (
              <tbody>
                {arr.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((cell, j) => <td key={j} style={{transform: `scale(${value.scale})`, opacity: value.scale}}>{cell}</td> )}
                    </tr>
                  )
                })}
              </tbody>
            )
          }}
          </Motion>
        </table>
      </div>
    );
  }
}
