const deepEqual = require('deep-equal')

let id = 0

const makeCallSpy = expected => {
  const spy = (passedType, passedPaylaod) => {
    let expectedType, expectedPayload
    if(Array.isArray(expected[spy.callCount])) {
      expectedType = expected[spy.callCount][0]
      expectedPayload = expected[spy.callCount][1]
    } else {
      expectedType = expected[spy.callCount]
    }

    expect(passedType).toEqual(expectedType)
    if (expectedPayload) {
      expect(deepEqual(passedPaylaod, expectedPayload)).toBe(true)
    }

    
    ++spy.callCount
  }

  spy.id = ++id
  spy.callCount = 0

  return spy 
}

const testAction = function(action, payload, 
                            expected={mutations: [], actions: []}, 
                            mocks={state: {}, getters: {}},
                            done=()=>{}) {

  // default args are not that powerful, so fix by hand
  expected.mutations = expected.mutations || []
  expected.actions = expected.actions || []

  const commitSpy = makeCallSpy(expected.mutations)
  const dispatchSpy = makeCallSpy(expected.actions)

  const checkAllCalled = () => {
    expect(commitSpy.callCount).toEqual(expected.mutations.length)
    expect(dispatchSpy.callCount).toEqual(expected.actions.length)
  }

  const actionReturns = action({ 
    commit: commitSpy, 
    dispatch: dispatchSpy,
    state: mocks.state, 
    getters: mocks.getters 
  }, payload)

  if(typeof actionReturns !== 'undefined' && actionReturns instanceof Promise) {
    actionReturns
      .then(checkAllCalled)
      .then(done)
  } else {
    checkAllCalled()
    done()
  }
}

export default testAction