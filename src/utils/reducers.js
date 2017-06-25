import R from 'ramda'

export const swap = R.curry((index1, index2, list) => {
  if (index1 > list.length - 1 || index2 > list.length - 1) {
    return list
  }
  const value1 = list[index1]
  const value2 = list[index2]
  const result = R.pipe(
    R.set(R.lensIndex(index1), value2),
    R.set(R.lensIndex(index2), value1)
  )(list)
  return result
})
