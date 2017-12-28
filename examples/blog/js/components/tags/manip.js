import React from 'react'
import PropTypes from 'prop-types'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import BoolInput from 'react-mobx-admin/components/mui/input/bool'
import EditView from 'react-mobx-admin/components/mui/view/edit'

const TagEditForm = ({store}) => {
  //
  const updateField = store.updateData.bind(store)

  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={store.__('name')} attr={'name'} record={store.record}
          onChange={updateField} errors={store.errors} />
        <BoolInput label={store.__('Published')} attr={'published'} record={store.record}
          onChange={updateField} errors={store.errors} />
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: PropTypes.object.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store.cv} onReturn2list={() => store.goto()} onSave={store.save.bind(store)}>
    <TagEditForm store={store.cv} />
  </EditView>
)
export default TagsEditView
