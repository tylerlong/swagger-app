import axios from 'axios'
import { message } from 'antd'

export const setProp = (path, value) => ({ type: 'SET_PROP', path, value })

export const loadState = () => async dispatch => {
  const res = await axios.get('./sample.json')
  dispatch({ type: 'SET_STATE', state: res.data })
  message.success(`data loaded`)
}
