//Generate map of widths
const span = document.createElement('span')
span.style.fontSize = '14px'
span.style.display = 'inline-block'
span.style.fontFamily = 'Arial'
document.body.appendChild(span)
const widths = {}
for (let i = 65; i <= 122; i++) {
  let letter = String.fromCharCode(i)
  span.innerText = letter
  widths[letter] = span.clientWidth
}
span.innerText = 'a a'
widths[' '] = span.clientWidth - 2 * widths['a']
document.body.removeChild(span)

export const getWidth = (value) => {
  return value.split('').map((c) => widths[c]).reduce((a, b) => a + b, 0)
}
