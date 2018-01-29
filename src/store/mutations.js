import shuffle from '@/src/utility/shuffle'
import getUniqueSet from '@/src/utility/getUniqueSet'

import config from '@/src/utility/gameConfig'


export const deckLoaderRegister = (state, loading) => {
  state.deck.loading = loading
}

export const deckLoaded = state => {
  state.deck.loaded = true
}

export const setStage = (state, newStage) => {
  state.stage = newStage
}


export const setMatched = (state, newMatched) => {
  state.matched = newMatched
}


export const setScore = (state, newScore) => {
  state.score = newScore
}


export const fillBoard = state => {
  const deck = getUniqueSet(config.board.size / 2, config.cards.options)
  const cards = deck.concat(deck).map(cardPath => ({
      path: cardPath,
      id: cardPath,
      flipped: false,
      hidden: false
    })
  )
  const shuffledCards = shuffle(cards)

  state.board = shuffledCards.reduce((board, card) => {
    if(board[board.length - 1].length === config.board.cols) board.push([])
    board[board.length - 1].push(card)     

    return board
  }, [[]])
}


export const maskAllCards = state => {
  state.board.forEach(row => {
    row.forEach(card => card.flipped = false)
  })
}


export const showAllCards = state => {
  state.board.forEach(row => {
    row.forEach(card => {
      card.flipped = true
      card.hidden = false
    })
  })
}


export const applyHiding = state => {
  state.toHide.forEach(card => card.hidden = true)
  state.toHide.length = 0
}


export const flipCard = (state, card) => {
  if( ! card.flipped) card.flipped = true
}


export const delayMutation = (state, {name, cb, delay=0}) => {
  if(state.timeouts[name]) {
    clearTimeout(state.timeouts[name])
  }
  
  state.timeouts[name] = setTimeout(cb, delay)
}