import * as R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import PathParameters from '../../components/PathParameters'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'
import { defaultPathParameter } from './PathParameter'

const pathParametersSelector = createSelector(
  state => state.pathParameters,
  pathParameters => R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['pathParameters', index], name, createdAt })),
    orderBy(R.prop('name')),
    R.map(R.omit(['name']))
  )(pathParameters)
)(state => 'pathParameters')
const mapStateToProps = state => ({ pathParameters: pathParametersSelector(state) })
export default connect(mapStateToProps, null)(PathParameters)

export const AddPathParameterButton = connect(
  state => ({ name: 'path parameter' }),
  dispatch => ({
    add: () => dispatch(addToArray(['pathParameters'], defaultPathParameter()))
  })
)(AddButton)
