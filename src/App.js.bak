import React, { Component } from 'react';
import { spring, Motion, presets } from 'react-motion';
import './App.css';

class App extends Component {
  render() {
    const { arr } = this.props;
    return (
      <div className="App">
        <table>
        <Motion defaultStyle={{scale: 0}} style={{scale: spring(1, presets.gentle)}}>
          {value => {
            console.log(value)
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

export default App;
