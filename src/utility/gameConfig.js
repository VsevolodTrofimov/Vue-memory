const config = {
  board: {
    rows: 3,
    cols: 6,

    size: undefined
  },

  // how long cards are visible in the beginning (ms)
  initialVisibleTime: 5000,
  
  // how long cards are visible after thay were sucessfully mathed (ms)
  matchedVisibleTime: 500,

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


const computeCardOptions = cards => {
  const options = []

  for(let value of config.cards.values) {
    for(let suit of config.cards.suits) {
      options.push(`${config.cards.path}/${value + suit}.${config.cards.ext}`)
    }
  }

  return options
}

config.cards.options = computeCardOptions(config.cards)
config.board.size = config.board.rows * config.board.cols


if(typeof process==='undefined' 
|| !process.env 
|| process.env.NODE_ENV !== 'production') {
  const appliedFixes = {
    even: false,
    size: false
  }

  const ensureEvenBoard = config => {
    if((config.board.cols * config.board.rows) % 2) {
      ++config.board.cols
      appliedFixes.even = true
    }

    config.board.size = config.board.rows * config.board.cols
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

      /* in case board beacame\stopped being even 
        as a side effect of size reduction */
      appliedFixes.even = false
      ensureEvenBoard(config)

      appliedFixes.size = true
    }  
  }


  // ensuring proper board
  ensureEvenBoard(config)
  ensureNoRepeats(config)


  // notifying about changes
  if(appliedFixes.size) console.warn('Board was too big')
  if(appliedFixes.even) console.warn('Board had uneven number of tiles')
  if(appliedFixes.size || appliedFixes.even) {
    console.warn('Changed board size to', 
                `[${config.board.rows} x ${config.board.cols}]`)
  }
}

export default config