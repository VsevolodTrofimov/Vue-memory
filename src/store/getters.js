export const unmatched = state => {
  const total = state.board.length * state.board[0].length
  return total - state.matched
}


// more than 10^4 cards wouldn't fit anyway
export const flipped = state => {
  const flipped = state.board.reduce((old, row) => {
    return old.concat(row.filter(card => card.flipped))
  }, [])

  return flipped
}


export const score = state => state.score
export const board = state => state.board
export const stage = state => state.stage