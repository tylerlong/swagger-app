import { message } from 'antd'

export const addModel = () => dispatch => {
  dispatch({ type: 'ADD_MODEL' })
  message.success(`Model added`)
}
