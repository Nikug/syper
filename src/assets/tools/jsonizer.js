import fs from 'fs'

const file = fs.readFileSync('../dictionaries/english-67k.txt')
const lines = file.toString().split('\n').slice(0, -1)
const newFile = {
  name: 'English 67K',
  words: lines,
}

fs.writeFileSync('../dictionaries/english-67k.json', JSON.stringify(newFile, null, 2))
