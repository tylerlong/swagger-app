import R from 'ramda'

export const alert = R.curry((type, message) => {
  if (R.complement(R.contains)(type, ['success', 'info', 'warning', 'error'])) {
    return R.identity
  }
  if (R.either(R.complement(R.is(String)), R.isEmpty)(message)) {
    return R.identity
  }
  return R.over(R.lensPath(['metadata', 'alerts']), R.append({ type, message }))
})

export const getFormItemLayout = (labelSpan, wrapperSpan) => {
  return {
    labelCol: {
      xs: { span: 24 },
      sm: { span: labelSpan }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: wrapperSpan }
    }
  }
}
export const formItemLayout = getFormItemLayout(6, 12)
export const subFormItemLayout = getFormItemLayout(6, 18)
