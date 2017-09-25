import R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import { setProp, deleteFromArray, addToArray } from '../../actions'
import Model from '../../components/Models/Model'
import { TextField, DeleteButton, AddButton } from '../../components/Common'

const propertiesSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('properties'), state),
  (path, properties = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['properties', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(properties)
)((state, props) => props.path.join('/'))
const mapStateToProps = (state, props) => ({ properties: propertiesSelector(state, props) })
export default connect(mapStateToProps, null)(Model)

export const ModelTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeleteModelButton = connect(
  (state, { path }) => ({
    componentName: 'model',
    recordName: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

export const AddModelPropertyButton = connect(
  state => ({ name: 'property' }),
  (dispatch, { path }) => ({ add: () => dispatch(addToArray(path.concat('properties'), { name: '🔥 name', description: '', type: 'string', createdAt: Date.now(), enum: [], isArray: false, required: false })) })
)(AddButton)
