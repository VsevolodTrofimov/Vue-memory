import * as mutations from '@/src/store/mutations.js'

describe('Mutations', () => {
  describe('Deck loading', () => {
    const state = {
      deck: {}
    }
  
    beforeEach(() => {
      state.deck.loading = undefined
      state.deck.loaded = false
    })

    it('Sets loading promise via deckLoadingRegister', () => {
      const promise = new Promise(() => {})
      mutations.deckLoadingRegister(state, promise)

      expect(state.deck.loading).toBe(promise)
    })

    it('Sets loaded as true via deckLoaded', () => {
      mutations.deckLoaded(state)
      expect(state.deck.loaded).toBe(true)
    })
  })
})