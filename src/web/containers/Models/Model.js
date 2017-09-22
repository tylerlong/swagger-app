import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray, addToArray } from '../../actions'
import Model from '../../components/Models/Model'
import { TextField, DeleteButton, AddButton } from '../../components/Common'

const mapStateToProps = (state, { path }) => {
  const { properties } = R.path(path, state)
  return {
    properties: R.pipe(
      R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: path.concat(['properties', index]), name, createdAt })),
      R.sortBy(R.prop('createdAt'))
    )(properties)
  }
}
export default connect(mapStateToProps, null)(Model)

export const ModelTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeleteModelButton = connect(
  (state, { path }) => {
    const { name } = R.path(path, state)
    return {
      componentName: 'model',
      recordName: name
    }
  },
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

export const AddModelPropertyButton = connect(
  state => ({ name: 'property' }),
  (dispatch, { path }) => ({ add: () => dispatch(addToArray(path.concat('properties'), { name: '🔥 name', description: 'description', type: 'string', createdAt: Date.now(), enum: [], isArray: false, required: false })) })
)(AddButton)
