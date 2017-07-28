import React from 'react'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import DateInput from 'react-mobx-admin/components/mui/input/date'
import MarkdownInput from 'react-mobx-admin/components/mui/input/markdown'
import SelectInput from 'react-mobx-admin/components/mui/input/select'
import EditView from 'react-mobx-admin/components/mui/view/edit'

const PostEditForm = ({store}) => {

  const entity = store.cv.entity
  const updateField = store.updateData.bind(store, store.cv)
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={store.__('title')} attr={'title'} record={entity}
            onChange={updateField} errors={store.cv.errors} /><br/>
          <SelectInput label={store.__('Category')} attr={'category'} record={entity}
            optionsrecord={store.options}
            optionsattr={'categories'}
            onChange={updateField}
            errors={store.cv.errors} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <DateInput label={store.__('published')} attr={'published_at'} record={entity}
            onChange={updateField} errors={store.cv.errors} /><br/>
          <DateInput label={store.__('unpublished')} attr={'unpublished_at'} record={entity}
            onChange={updateField} errors={store.cv.errors} /><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <MarkdownInput label={store.__('content')} attr={'content'} record={entity}
            onChange={updateField} errors={store.cv.errors} mdrender={marked} />
        </div>
      </div>
    </div>
  )
}

const PostEditView = ({store}) => (
  <EditView store={store} onReturn2list={store.onReturn2list.bind(store)} onSave={store.saveEntity.bind(store)}>
    <PostEditForm store={store} />
  </EditView>
)
export default PostEditView
