import config from '@/src/utility/gameConfig'


export const startGame = ({commit, dispatch}) => {
  commit('fillBoard')
  commit('setScore', 0)
  commit('setMatched', 0)
  commit('showAllCards', 'game')
  commit('setStage', 'game')

  setTimeout(() => commit('maskAllCards'), config.initialVisibleTime)
}


export const restartGame = ({commit, dispatch}) => {
  dispatch('startGame')
}


export const endGame = ({commit}) => {
  commit('setStage', 'end')
}


export const flipCard = ({commit, dispatch, getters}, card) => {
  if((card.flipped && getters.flipped.length !== 2) || card.hidden) return

  if(getters.flipped.length === 1) {
    commit('flipCard', card)
    dispatch('matchCards')
  } else {
    commit('maskAllCards')
    commit('flipCard', card)
  }
}


export const matchCards = ({commit, dispatch, state, getters}) => {
  if(getters.flipped[0].id === getters.flipped[1].id) {
    dispatch('applyCardMatch')
  } else {
    const diff = config.calcScore.failure(state.matched, getters.unmatched)
    commit('setScore', getters.score + diff)
  }
}


export const applyCardMatch = ({commit, dispatch, state, getters}) => {
  const diff = config.calcScore.success(state.matched, getters.unmatched)
  commit('setScore', getters.score + diff)
  
  commit('setMatched', state.matched + 2)
  getters.flipped.forEach(card => commit('hideCard', card))

  if(getters.unmatched === 0) dispatch('endGame')
}