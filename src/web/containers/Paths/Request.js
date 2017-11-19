import * as R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import { setProp, deleteFromArray, addToArray } from '../../actions'
import { TextField, SelectField, DeleteButton, CheckboxField, AddButton } from '../../components/Common'
import Request from '../../components/Paths/Request'
import { defaultProperty } from '../Models/Property'
import { defaultExample } from './Example'

export const defaultRequest = () => ({
  createdAt: Date.now(),
  name: '🔥 name',
  since: '',
  description: '',
  method: 'GET',
  throttlingGroup: 'Light',
  permissions: [],
  tags: [],
  status: 'Normal',
  accessLevel: 'Basic',
  batch: false,
  beta: false,
  parameters: [],
  request: [],
  response: [],
  examples: []
})

const examplesSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('examples'), state),
  (path, examples = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['examples', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(examples)
)((state, props) => props.path.join('/'))
const queryParametersSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('parameters'), state),
  (path, queryParameters = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['parameters', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(queryParameters)
)((state, props) => props.path.join('/'))
const requestFieldsSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('request'), state),
  (path, requestFields = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['request', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(requestFields)
)((state, props) => props.path.join('/'))
const responseFieldsSelector = createSelector(
  (state, props) => props.path,
  (state, props) => R.path(props.path.concat('response'), state),
  (path, responseFields = []) => R.pipe(
    R.addIndex(R.map)(({ createdAt }, index) => ({ path: path.concat(['response', index]), createdAt })),
    R.sortBy(R.prop('createdAt'))
  )(responseFields)
)((state, props) => props.path.join('/'))
export default connect((state, props) => ({
  examples: examplesSelector(state, props),
  queryParameters: queryParametersSelector(state, props),
  requestFields: requestFieldsSelector(state, props),
  responseFields: responseFieldsSelector(state, props)
}), null)(Request)

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const RequestTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const RequestSelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const RequestCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

export const PermissionsSelectField = connect((state, { path, name = 'permissions' }) => ({
  value: R.path(path.concat(name), state),
  options: R.map(R.prop('name'), state.permissions),
  name,
  isArray: true
}), (dispatch, { path, name = 'permissions' }) => { return mapDispatchToProps(dispatch, { path, name }) })(SelectField)
export const TagsSelectField = connect((state, { path, name = 'tags' }) => ({
  value: R.path(path.concat(name), state),
  options: state.info.tags,
  name,
  isArray: true
}), (dispatch, { path, name = 'tags' }) => { return mapDispatchToProps(dispatch, { path, name }) })(SelectField)

export const DeleteRequestButton = connect(
  (state, { path }) => ({
    name: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

export const AddPathRequestExampleButton = connect(
  state => ({ name: 'example' }),
  (dispatch, { path }) => ({
    add: () => dispatch(addToArray(path.concat('examples'), defaultExample()))
  })
)(AddButton)

export const AddPathRequestQueryParameterButton = connect(
  state => ({ name: 'query parameter' }),
  (dispatch, { path }) => ({
    add: () => dispatch(addToArray(path.concat('parameters'), defaultProperty()))
  })
)(AddButton)

export const AddPathRequestRequestFieldButton = connect(
  state => ({ name: 'request field' }),
  (dispatch, { path }) => ({
    add: () => dispatch(addToArray(path.concat('request'), defaultProperty()))
  })
)(AddButton)

export const AddPathRequestResponseFieldButton = connect(
  state => ({ name: 'response field' }),
  (dispatch, { path }) => ({
    add: () => dispatch(addToArray(path.concat('response'), defaultProperty()))
  })
)(AddButton)
