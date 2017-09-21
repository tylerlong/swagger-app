import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, addModel, addModelProperty, deleteFromArray } from '../../actions'
import Model from '../../components/Models/Model'
import TextField from '../../components/Common/TextField'
import DeleteButton from '../../components/Common/DeleteButton'
import AddButton from '../../components/Common/AddButton'

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

export const ModelTextField = connect(
  ({ models }, { index, name }) => ({ value: models[index][name] }),
  (dispatch, { index, name }) => ({
    update: value => dispatch(setProp(['models', index, name], value))
  }))(TextField)

export const DeleteModelButton = connect(
  ({ models }, { index }) => {
    const { name } = models[index]
    return {
      componentName: 'model',
      recordName: name
    }
  },
  (dispatch, { index }) => ({
    deleteRecord: () => dispatch(deleteFromArray('models', index))
  }))(DeleteButton)

export const AddModelButton = connect(
  (state) => ({ name: 'model' }),
  (dispatch) => ({ add: () => dispatch(addModel()) })
)(AddButton)
