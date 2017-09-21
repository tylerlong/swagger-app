import R from 'ramda'
import { connect } from 'react-redux'

import Models from '../../components/Models'
import { orderBy } from '../../utils'

const mapStateToProps = ({ models }) => ({
  models: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ index, name, createdAt })),
    orderBy(R.prop('name'))
  )(models)
})
export default connect(mapStateToProps, null)(Models)
