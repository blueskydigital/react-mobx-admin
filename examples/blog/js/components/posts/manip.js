import React from 'react'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import DateInput from 'react-mobx-admin/components/mui/input/date'
import SelectInput from 'react-mobx-admin/components/mui/input/select'
import EditView from 'react-mobx-admin/components/mui/view/edit'

const PostEditForm = ({store, view}) => {
  const updateField = view.updateData.bind(view)

  return (
    <div>
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <TextInput label={store.__('title')} attr={'title'} record={view.record}
            onChange={updateField} errors={view.errors} />
          <SelectInput label={store.__('Category')} attr={'category'} record={view.record}
            optionsrecord={store.options}
            optionsattr={'categories'}
            onChange={updateField}
            errors={view.errors} />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <DateInput label={store.__('published')} attr={'published_at'} record={view.record}
            onChange={updateField} errors={view.errors} />
          <DateInput label={store.__('unpublished')} attr={'unpublished_at'} record={view.record}
            onChange={updateField} errors={view.errors} />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <TextInput label={store.__('content')} attr={'content'} record={view.record}
            onChange={updateField} errors={view.errors} />
        </div>
      </div>
    </div>
  )
}

const PostEditView = ({store}) => (
  <EditView store={store.cv} onReturn2list={() => store.goto()} onSave={store.saveEntity.bind(store)}>
    <PostEditForm store={store} view={store.cv} />
  </EditView>
)
export default PostEditView
