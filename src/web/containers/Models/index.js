import R from 'ramda'
import { connect } from 'react-redux'

import Models from '../../components/Models'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const mapStateToProps = ({ models }) => ({
  models: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['models', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(models)
})
export default connect(mapStateToProps, null)(Models)

export const AddModelButton = connect(
  (state) => ({ name: 'model' }),
  (dispatch) => ({ add: () => dispatch(addToArray(['models'], { name: '🔥 name', createdAt: Date.now(), properties: [] })) })
)(AddButton)
