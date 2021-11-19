export const produceNum = (i, imagesLength) => {
  if (i<= imagesLength) {
    return i
  } else {
    if (i % imagesLength === 0) {
      return imagesLength
    } else {
      return i % imagesLength
    }
  }

}
