export const preloadImages = urls => {
  const imageLoads = urls.map(url => new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = resolve
    img.onerror = reject
  }))

  return Promise.all(imageLoads)
}
