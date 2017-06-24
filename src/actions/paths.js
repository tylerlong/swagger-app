import { message } from 'antd'

export const addPath = () => dispatch => {
  dispatch({ type: 'ADD_PATH' })
  message.success(`Path added`)
}
