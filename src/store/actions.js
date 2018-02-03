import config from '@/src/utility/gameConfig'
import { preloadImages } from '@/src/utility/preload'

export const loadDeck = ({commit, dispatch}) => {
  const loading = preloadImages(config.cards.options)
  commit('deckLoaderRegister', loading)

  return new Promise((resovle, reject) => {
    loading
      .then(() => {
        commit('deckLoaded')
        resovle()
      })
      .catch(reject)
  })
}

export const startGame = ({commit, dispatch, getters}) => {
  if(getters.deck.loaded) {
    commit('fillBoard')
    commit('setScore', 0)
    commit('setMatched', 0)
    commit('showAllCards')
    commit('setStage', 'game')
  
    dispatch('commitDelayed', {
      mutation: 'maskAllCards',
      delay: config.initialVisibleTime,
      id: 'startGame-1'
    })

    //for future
    preloadImages(['/static/cards/back.png', '/static/banners/EndGame@2x.png'])
  } else {
    commit('setStage', 'loading')
    return new Promise((resolve, reject) => {
      getters.deck.loading
        .then(() => {
          dispatch('startGame')
          resolve()
        })
        .catch(reject)
    })
  }
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


export const matchCards = ({commit, dispatch, getters}) => {
  if(getters.flipped[0].id === getters.flipped[1].id) {
    dispatch('applyCardMatch')
  } else {
    const diff = config.calcScore.failure(getters.matched, getters.unmatched)
    commit('setScore', getters.score + diff)
  }
}


export const applyCardMatch = ({commit, dispatch, getters}) => {
  const diff = config.calcScore.success(getters.matched, getters.unmatched)
  commit('setScore', getters.score + diff)
  
  commit('setMatched', getters.matched + 2)

  getters.flipped.forEach(card => commit('queueCardToHide', card))

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


export const commitDelayed = ({commit}, {mutation, delay, id, payload}) => {
  if(typeof id === 'undefined') {
    console.warn(
      `Not passing id parameter to commitDelayed puts you at risk
       of unknowingly resetting needed timeout`
    )
  }


  commit('delayMutation', {
    name: `${mutation}---${id}`,
    cb: () => commit(mutation, payload), // mutations cannot commit
    delay
  })
}