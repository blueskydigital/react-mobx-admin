import React from 'react'
import PropTypes from 'prop-types'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import BoolInput from 'react-mobx-admin/components/mui/input/bool'
import EditView from 'react-mobx-admin/components/mui/view/edit'

const TagEditForm = ({store}) => {

  const entity = store.cv.entity
  const updateField = store.updateData.bind(store, store.cv)

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <TextInput label={store.__('name')} attr={'name'} record={entity} onChange={updateField}
          errors={store.cv.errors} /><br/>
        <BoolInput label={store.__('Published')} attr={'published'} record={entity} onChange={updateField} />
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: PropTypes.object.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store} onReturn2list={store.onReturn2list.bind(store)} onSave={store.saveEntity.bind(store)}>
    <TagEditForm store={store} />
  </EditView>
)
export default TagsEditView
