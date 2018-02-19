import * as mutations from '@/src/store/mutations.js'


jest.useFakeTimers()


describe('Mutations', () => {
  describe('Utilities', () => {
    const state = {}

    beforeEach(() => {
      state.timeouts = {}
    })

    describe('delayMutation', () => {
      it('Sets timeout', () => {
        const name = 'name'
        const cb = () => jest.fn()
        const delay = 100
        const clear = () => {
          clearTimeout(state.timeouts[name])
        }

        mutations.delayMutation(state, {name, cb, delay})

        expect(setTimeout).toHaveBeenLastCalledWith(cb, delay)
        expect(clear).not.toThrow()
      })

      it('Overwrites old timeout', () => {
        const name = 'name'
        const cb1 = jest.fn()
        const cb2 = jest.fn()
        const delay = 10000

        mutations.delayMutation(state, {name, cb: cb1, delay})
        mutations.delayMutation(state, {name, cb: cb2, delay})

        expect(setTimeout).toHaveBeenLastCalledWith(cb2, delay)
        jest.runAllTimers()
        expect(cb1).not.toHaveBeenCalled()
      })

      it('Passes 0 delay by default', () => {
        const name = 'name'
        const cb = jest.fn()

        mutations.delayMutation(state, {name, cb})

        expect(setTimeout).toHaveBeenLastCalledWith(cb, 0)
      })
    })
  })
})