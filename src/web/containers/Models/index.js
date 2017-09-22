import R from 'ramda'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Models from '../../components/Models'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const getModels = state => state.models
const getOrderedModels = createSelector(
  getModels,
  models => R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['models', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(models)
)
const mapStateToProps = state => ({ models: getOrderedModels(state) })
export default connect(mapStateToProps, null)(Models)

export const AddModelButton = connect(
  state => ({ name: 'model' }),
  dispatch => ({ add: () => dispatch(addToArray(['models'], { name: '🔥 name', createdAt: Date.now(), properties: [] })) })
)(AddButton)
