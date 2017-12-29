const config = {
  board: {
    rows: 3,
    cols: 6,

    size: undefined
  },

  // how long cards are visible in the beginning (ms)
  initialVisibleTime: 5000,
  
  calcScore: {
    success: (matched, unmatched) => unmatched * 42,
    failure: (matched, unmatched) => matched * -42
  },

  // for static filename matching & board generation
  cards: {
    values: ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'],
    suits: ['C', 'D', 'H', 'S'],
    path: '/static/cards',
    ext: 'png',

    options: undefined,
    total: undefined
  },
}


const ensureEvenBoard = config => {
  if((config.board.cols * config.board.rows) % 2) ++config.board.cols

  config.board.size = config.board.rows * config.board.cols
}

const computeCardOptions = cards => {
  const options = []

  for(let value of config.cards.values) {
    for(let suit of config.cards.suits) {
      options.push(`${config.cards.path}/${value + suit}.${config.cards.ext}`)
    }
  }

  return options
}

const ensureNoRepeats = config => {
  while(config.cards.options.length < config.board.size / 2) {
    
    if(config.board.cols > config.board.rows) {
      if(config.board.rows % 2) {
        --config.board.cols
        --config.board.rows
      }

      --config.board.cols
    } else {
      --config.board.rows
    }

    ensureEvenBoard(config)
  }  
}


config.cards.options = computeCardOptions(config.cards)
ensureEvenBoard(config)
ensureNoRepeats(config)

export default config