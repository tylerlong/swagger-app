import R from 'ramda'
import { connect } from 'react-redux'

import { deleteModel, addModelProperty } from '../../actions'
import Model from '../../components/Models/Model'

const mapStateToProps = ({ models }, { index }) => {
  const { name, properties } = models[index]
  return {
    model: {
      name,
      properties: R.pipe(
        R.addIndex(R.map)(({ name, createdAt }, index) => ({ index, name, createdAt })),
        R.sortBy(R.prop('createdAt'))
      )(properties)
    }
  }
}
const mapDispathToProps = (dispatch, { index }) => ({
  deleteModel: () => dispatch(deleteModel(index)),
  addModelProperty: () => dispatch(addModelProperty(index))
})
export default connect(mapStateToProps, mapDispathToProps)(Model)
