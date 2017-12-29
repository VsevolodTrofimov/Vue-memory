const getUniqueSet = (size, from) => {
  const used = []

  for(let i = 0; i < size; ++i) {
    let idx = Math.floor(Math.random() * from.length)
    
    while(used.indexOf(idx) !== -1) {
      idx = (idx + 1) % from.length
    }

    used.push(idx)
  }

  return used.map(idx => from[idx])
}

export default getUniqueSet