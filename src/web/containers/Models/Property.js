import R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, CheckboxField, DeleteButton, TypeSelectField } from '../../components/Common'
import { orderBy } from '../../utils'

export const defaultProperty = () => ({
  createdAt: Date.now(),
  name: '🔥 name',
  description: '',
  type: 'string',
  enum: [],
  required: false,
  isArray: false
})

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const PropertyTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PropertyCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

const modelsSelector = createSelector(
  state => state.models,
  models => R.pipe(
    R.map(({ name, createdAt }) => ({ name, createdAt })),
    orderBy(R.prop('name'))
  )(models)
)(state => 'models')
export const PropertyTypeSelectField = connect(
  (state, { path }) => ({
    value: R.path(path.concat('type'), state),
    models: modelsSelector(state)
  }),
  (dispatch, { path }) => ({
    update: value => dispatch(setProp(path.concat('type'), value))
  })
)(TypeSelectField)

export const DeletePropertyButton = connect(
  (state, { path }) => ({
    name: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
