import R from 'ramda'
import { connect } from 'react-redux'

import { addModelProperty } from '../../actions'
import Model from '../../components/Models/Model'

const mapStateToProps = ({ models }, { index }) => {
  const { properties } = models[index]
  return {
    properties: R.pipe(
      R.addIndex(R.map)(({ name, createdAt }, index) => ({ index, name, createdAt })),
      R.sortBy(R.prop('createdAt'))
    )(properties)
  }
}
const mapDispathToProps = (dispatch, { index }) => ({
  addModelProperty: () => dispatch(addModelProperty(index))
})
export default connect(mapStateToProps, mapDispathToProps)(Model)
