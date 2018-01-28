import config from '@/src/utility/gameConfig'


export const startGame = ({commit, dispatch}) => {
  commit('fillBoard')
  commit('setScore', 0)
  commit('setMatched', 0)
  commit('showAllCards', 'game')
  commit('setStage', 'game')

  dispatch('commitDelayed', {
    mutation: 'maskAllCards',
    delay: config.initialVisibleTime,
    id: 'startGame-1'
  })
}


export const restartGame = ({commit, dispatch}) => {
  dispatch('startGame')
}


export const endGame = ({commit}) => {
  commit('setStage', 'end')
}


export const flipCard = ({commit, dispatch, getters}, card) => {
  commit('applyHiding')
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

  getters.flipped.forEach(card => state.toHide.push(card))

  if(getters.unmatched === 0) {
    dispatch('endGame')
  } else {
    dispatch('commitDelayed', {
      mutation: 'applyHiding',
      delay: config.matchedVisibleTime,
      id: 'applyCardMatch-1'
    })
  }
}


export const commitDelayed = ({commit, state}, {mutation, delay, id, data}) => {
  if(typeof id === 'undefined') {
    console.warn(
      `Not passing id parameter to commitDelayed puts you in risk
       of unknowingly resetting needed timeout`
    )
  }


  commit('delayMutation', {
    name: `${mutation}---${id}`,
    cb: () => commit(mutation, data),
    delay
  })
}