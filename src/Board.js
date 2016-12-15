import React form 'react'

class Board extends React.Component {
  componentDidMount () {

  }
  
  render () {
    const board = this.props
    const size = board.size()

    const rows = []
    for (var i = 0; i < size.y; i++) {
      const cols = []
      for (var j = 0; j < size.x; j++) {
        cols[j] = <td key={j}></td>
      }
      rows[j] = <tr key={i}>{cols}</tr>
    }
    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board
