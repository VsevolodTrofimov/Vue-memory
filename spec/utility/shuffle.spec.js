import shuffle from '@/src/utility/shuffle'

describe('Shuffle', () => {
  const itemSet = []
  let shuffled = []

  beforeAll(() => {
    for(let i = 0; i < 100; ++i) itemSet.push({id: i}) // id is needed for debug only
  })

  beforeEach(() => {
    shuffled = shuffle(itemSet)
  })
  
  it('changes order at least once in 100 runs', () => {
    let changes
    let reShuffled

    for(let i = 0; i < 100; ++i) {
      reShuffled = shuffle(itemSet)
      changes = reShuffled.filter((x, idx) => itemSet.indexOf(x) !== idx).length

      if(changes > 0) break // why wait when it works
    }

    expect(changes).toBeGreaterThan(0)
  })

  it('doesn\'t loose elements', () => {
    const lost = itemSet.filter(x => shuffled.indexOf(x) === -1).length
    expect(lost).toEqual(0)
  })

  it('doesn\'t add elements', () => {
    const added = shuffled.filter(x => itemSet.indexOf(x) === -1).length
    expect(added).toEqual(0)
  })
})