import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    const { arr } = this.props;
    return (
      <div>
        <table>
          <tbody>
            {arr.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td> )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
