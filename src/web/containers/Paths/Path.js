import * as R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import { setProp, deleteFromArray, addToArray } from '../../actions'
import Path from '../../components/Paths/Path'
import { TextField, DeleteButton, AddButton } from '../../components/Common'
import { defaultRequest } from './Request'

export const defaultPath = () => ({
  createdAt: Date.now(),
  name: '',
  uri: '🔥 /',
  requests: []
})

const requestsSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('requests'), state),
  (path, requests = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['requests', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(requests)
)((state, props) => props.path.join('/'))
const mapStateToProps = (state, props) => ({ requests: requestsSelector(state, props) })
export default connect(mapStateToProps, null)(Path)

export const PathTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeletePathButton = connect(
  (state, { path }) => ({
    name: R.path(path.concat('uri'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

export const AddPathRequestButton = connect(
  state => ({ name: 'request' }),
  (dispatch, { path }) => ({
    add: () => dispatch(addToArray(path.concat('requests'), defaultRequest()))
  })
)(AddButton)
