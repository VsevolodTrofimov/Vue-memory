import getUniqueSet from '@/src/utility/getUniqueSet'

const count = (arr, el) => arr.filter(x => x === el).length 

describe('GetUniqueSet', () => {
  const itemSet = []
  let shuffled = []

  beforeAll(() => {
    for(let i = 0; i < 100; ++i) itemSet.push({id: i}) // id is needed for debug only
  })
  
  it('gets exactly N elements', () => {
    for(let i = 0; i < 20; i += 3) {
      expect(getUniqueSet(i, itemSet).length).toEqual(i)
    }
  })

  it('get elemets without repetitions', () => {
    const repetitions = getUniqueSet(50, itemSet)
                          .map(x => count(itemSet, x) - 1)
                          .reduce((old, x) => old + x, 0)
    expect(repetitions).toEqual(0)
  })
})