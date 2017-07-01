import R from 'ramda'

// todo: this method is not used any more
export const swap = R.curry((index1, index2, list) => {
  if (index1 < 0 || index2 < 0 || index1 > list.length - 1 || index2 > list.length - 1) {
    return list // index out of bound
  }
  const value1 = list[index1]
  const value2 = list[index2]
  return R.pipe(
    R.set(R.lensIndex(index1), value2),
    R.set(R.lensIndex(index2), value1)
  )(list)
})

export const alert = R.curry((type, message) => {
  if (R.complement(R.contains)(type, ['success', 'info', 'warning', 'error'])) {
    return R.identity
  }
  if (R.either(R.complement(R.is(String)), R.isEmpty)(message)) {
    return R.identity
  }
  return R.over(R.lensPath(['metadata', 'alerts']), R.append({ type, message }))
})
