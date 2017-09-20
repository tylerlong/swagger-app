import R from 'ramda'
import { connect } from 'react-redux'

import { addModel } from '../../actions'
import Models from '../../components/Models'
import { orderBy } from '../../utils'

const mapStateToProps = ({ models }) => {
  let mappedModels = models
  mappedModels = R.addIndex(R.map)(({ name, createdAt }, index) => ({ index, name, createdAt }), mappedModels)
  mappedModels = orderBy(R.prop('name'), mappedModels)
  return { models: mappedModels }
}
const mapDispatchToProps = { addModel }
export default connect(mapStateToProps, mapDispatchToProps)(Models)
