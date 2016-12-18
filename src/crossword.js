import _ from 'lodash'

function choose(choices) {
    let i = Math.floor(Math.random() * choices.length);
    return choices[i];
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export class Board {

    static from_words(words) {
        // Creates a board containing the given words
        const board = new Board()
        const sorted_words = _.orderBy(words, (w) => w.length, 'desc')
        sorted_words.forEach((word) => board.add_word(word))
        return board
    }

    constructor() {
        this.words = []
    }

    toObject() {
        return this.words
    }

    normalizeCoordinates() {
        // Find min and max, x and y
        let offsetX = Math.min(...this.words.map(w => w.posX))
        let offsetY = Math.min(...this.words.map(w => w.posY))

        this.words.forEach((word) => {
            word.posX -= offsetX
            word.posY -= offsetY
        })
    }

    get size() {
        return {
            x: Math.max(...this.words.map(w => w.direction === 'H' ? w.posX + w.word.length - 1 : w.posX)) + 1,
            y: Math.max(...this.words.map(w => w.direction === 'V' ? w.posY + w.word.length - 1 : w.posY)) + 1
        }
    }

    /*
    Squareness of the crossword. Number between 0 and 1, being 1 perfectly
    square and 0 infinitely disproportional.
    */
    get squareness () {
      const size = this.size
      return Math.min(size.x / size.y, size.y / size.x)
    }

    get fullness () {
      const size = this.size
      const cells = size.x * size.y
      const letters = this.toArray().map((row) => {
        return row.filter((cell) => cell !== '').length
      }).reduce((a, b) => a + b, 0)
      return letters / cells
    }

    get score () {
      return (this.squareness + this.fullness) / 2
    }

    toArray() {
        let size = this.size

        // Create array
        let arr = []
        for (let i = 0; i < size.y; i++) {
            arr[i] = []
            for (let j = 0; j < size.x; j++) {
                arr[i][j] = ""
            }
        }

        this.words.forEach(w => {
            w.word.split("").forEach((c, i) => {
                if (w.direction === 'H') {
                    arr[w.posY][w.posX + i] = c
                }
                if (w.direction === 'V') {
                    arr[w.posY + i][w.posX] = c
                }
            })
        })
        return arr
    }

    is_cell_occupied(x, y) {
        for (let i = 0; i < this.words.length; i++) {
            let w = this.words[i]
            if (w.direction === 'V') {
                if (w.posX === x && y >= w.posY && y < w.posY + w.word.length) {
                    return true
                }
            } else {
                if (w.posY === y && x >= w.posX && x < w.posX + w.word.length) {
                    return true
                }
            }
        }
        return false
    }

    add_word(word) {
        // Si es la primera palabra del crossword, simplemente se agrega
        if (this.words.length === 0) {
            this.words.push({
                'word': word,
                'posX': 0,
                'posY': 0,
                'direction': choose(['H', 'V'])
            })
        } else {
            // We will shuffle the array to generate different
            // crosswords each time
            const copy = shuffle(this.words)
            for (let j = 0; j < copy.length; j++) {
                let w = copy[j]
                    // w es cada una de las palabras
                    // (words) que ya están en el crossword
                for (let i = 0; i < w.word.length; i++)
                // i es el índice del caracter que se usa de
                // la palabra que ya está en el crossword
                    if (word.includes(w.word[i])) {
                    let p = word.indexOf(w.word[i])
                        // p es el índice del caracter en el que hay match con
                        // i. Pertenece a la palabra que quiere entrar
                        // al crossword.
                    let direction = w.direction === 'H' ? 'V' : 'H'
                    let available = false
                    let cells_to_check = []
                    let posX, posY
                    if (direction === 'H') {
                        // La nueva palabra va a estar posicionada ennn...
                        posX = w.posX - p
                        posY = w.posY + i
                            // Ahora se checkea que la palabra, empezando en esa posición y teniendo esa dirección, tenga el espacio correspondiente
                        for (let x = posX - 1; x <= posX + word.length + 1; x++) {
                            if (x !== w.posX) {
                                cells_to_check.push([x, posY])
                            }
                        }
                        for (let x = posX; x <= posX + word.length; x++) {
                            if (x !== w.posX) {
                                cells_to_check.push([x, posY + 1])
                            }
                        }
                        for (let x = posX; x <= posX + word.length; x++) {
                            if (x !== w.posX) {
                                cells_to_check.push([x, posY - 1])
                            }
                        }
                    }
                    if (direction === 'V') {
                        // La nueva palabra va a estar posicionada ennn...
                        posX = w.posX + i // The position correspondant to the matching char in the word that was already there
                        posY = w.posY - p // The position correspondant to the matching char, and going up p characters
                            // Ahora se checkea que la palabra, empezando en esa posición y teniendo esa dirección, tenga el espacio correspondiente
                        for (let y = posY - 1; y <= posY + word.length + 1; y++) {
                            if (y !== w.posY) {
                                cells_to_check.push([posX, y])
                            }
                        }
                        for (let y = posY; y <= posY + word.length; y++) {
                            if (y !== w.posY) {
                                cells_to_check.push([posX + 1, y])
                            }
                        }
                        for (let y = posY; y <= posY + word.length; y++) {
                            if (y !== w.posY) {
                                cells_to_check.push([posX - 1, y])
                            }
                        }
                    }
                    available = _.every(cells_to_check, (cell) => !this.is_cell_occupied(...cell))
                        // Si la palabra TIENE el espacio correspondiente, se agrega al crucigrama
                    if (available) {
                        this.words.push({
                            'word': word,
                            'posX': posX,
                            'posY': posY,
                            'direction': direction
                        })
                        this.normalizeCoordinates()
                        return
                    }
                }
            }
        }
    }
}
