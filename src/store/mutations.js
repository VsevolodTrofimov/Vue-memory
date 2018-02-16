import shuffle from '@/src/utility/shuffle'
import getUniqueSet from '@/src/utility/getUniqueSet'

import config from '@/src/utility/gameConfig'


export const deckLoadingRegister = (state, loading) => {
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
  const hydrateCard = (path, id) => ({
    path,
    id,
    value: path,
    flipped: false,
    hidden: false
  })

  const deck = getUniqueSet(config.board.size / 2, config.cards.options)
  const cards1 = deck.map(path => hydrateCard(path, path + '_1'))
  const cards2 = deck.map(path => hydrateCard(path, path + '_2'))
  const shuffledCards = shuffle(cards1.concat(cards2))

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
  card.flipped = ! card.flipped
}

export const queueCardToHide = (state, card) => {
  state.toHide.push(card)
}


export const delayMutation = (state, {name, cb, delay=0}) => {
  if(state.timeouts[name]) {
    clearTimeout(state.timeouts[name])
  }
  
  state.timeouts[name] = setTimeout(cb, delay)
}