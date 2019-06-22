export const getFormat = (word, prev, position) => {
  if (position === 0 || (position > 0 && prev.search(',') !== -1)) {
    word = word + ': '
  } else if (position > 0 && prev.search(':') !== -1) {
    word = word + ': '
    prev = prev.replace(':', ',')
  }
  return { word, prev }
}

export const staticList = [
  'John',
  'Jake',
  'Joe',
  'Noah',
  'Emma',
  'Will',
  'William',
  'Andrew',
  'Brady',
  'Ethan',
  'Dan',
  'Daniel',
  'Danny'
]
