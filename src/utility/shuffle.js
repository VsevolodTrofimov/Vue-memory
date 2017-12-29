const shuffle = source => {
  const arr = source.slice()
  let a, b, tmp

  for (a = arr.length - 1; a > 0; --a) {
      b = Math.floor(Math.random() * (a + 1))
      tmp    = arr[a]
      arr[a] = arr[b]
      arr[b] = tmp
  }

  return arr
}

export default shuffle