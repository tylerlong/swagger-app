import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray, addToArray } from '../../actions'
import Path from '../../components/Paths/Path'
import { TextField, DeleteButton, AddButton } from '../../components/Common'

const mapStateToProps = (state, { path }) => {
  const { requests } = R.path(path, state)
  return {
    requests: R.pipe(
      R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: path.concat(['requests', index]), name, createdAt })),
      R.sortBy(R.prop('createdAt'))
    )(requests)
  }
}
export default connect(mapStateToProps, null)(Path)

export const PathTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeletePathButton = connect(
  (state, { path }) => {
    const { name } = R.path(path, state)
    return {
      componentName: 'path',
      recordName: name
    }
  },
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

export const AddPathRequestButton = connect(
  state => ({ name: 'request' }),
  (dispatch, { path }) => ({ add: () => dispatch(addToArray(path.concat('requests'), { name: '🔥 name', description: 'description', method: 'GET', createdAt: Date.now(), since: '', apiGroup: 'Light', permissions: [], batch: false, visibility: 'public', status: 'normal', tags: [], parameters: {}, request: {}, response: {}, examples: [] })) })
)(AddButton)
