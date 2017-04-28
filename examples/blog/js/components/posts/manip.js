import React from 'react'
import { observer } from 'mobx-react'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import DateInput from 'react-mobx-admin/components/mui/input/date'
import MarkdownInput from 'react-mobx-admin/components/mui/input/markdown'
import SelectInput from 'react-mobx-admin/components/mui/input/select'
import EditView from 'react-mobx-admin/components/mui/view/edit'

const PostEditForm = ({state}) => {

  const entity = state.currentView.entity
  const updateField = state.updateData.bind(state)
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={state.__('title')} attr={'title'} record={entity}
            onChange={updateField} errors={state.currentView.errors} /><br/>
          <SelectInput label={state.__('Category')} attr={'category'} record={entity}
            optionsrecord={state.options}
            optionsattr={'categories'}
            onChange={updateField}
            errors={state.currentView.errors} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <DateInput label={state.__('published')} attr={'published_at'} record={entity}
            onChange={updateField} errors={state.currentView.errors} /><br/>
          <DateInput label={state.__('unpublished')} attr={'unpublished_at'} record={entity}
            onChange={updateField} errors={state.currentView.errors} /><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <MarkdownInput label={state.__('content')} attr={'content'} record={entity}
            onChange={updateField} errors={state.currentView.errors} mdrender={marked} />
        </div>
      </div>
    </div>
  )
}

const PostEditView = ({state}) => (
  <EditView state={state} onReturn2list={state.showPostList.bind(state)} onSave={state.savePost.bind(state)}>
    <PostEditForm state={state} />
  </EditView>
)
export default PostEditView
