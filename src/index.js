import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Board } from './crossword'

const b = Board.from_words(['hola', 'chau', 'tabla', 'concentracion', 'televisor', 'radio', 'internet', 'barco', 'avion '])

ReactDOM.render(
  <App arr={b.toArray()} />,
  document.getElementById('root')
);

window.b = b;
