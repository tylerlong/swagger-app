import R from 'ramda'
import { connect } from 'react-redux'

import Models from '../../components/Models'
import { orderBy } from '../../utils'
import { addModel } from '../../actions'
import AddButton from '../../components/Common/AddButton'

const mapStateToProps = ({ models }) => ({
  models: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['models', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(models)
})
export default connect(mapStateToProps, null)(Models)

export const AddModelButton = connect(
  (state) => ({ name: 'model' }),
  (dispatch) => ({ add: () => dispatch(addModel()) })
)(AddButton)
