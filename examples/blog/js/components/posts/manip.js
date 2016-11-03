import React from 'react'
import { observer } from 'mobx-react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import MarkdownInput from 'react-mobx-admin/mui/input/markdown'
import SelectInput from 'react-mobx-admin/mui/input/select'
import MUIEditView from 'react-mobx-admin/mui/view/edit'

@observer
class PostEditView extends MUIEditView {

  renderForm(state) {
    const entity = state.currentView.entity
    const updateField = this.updateField.bind(this)
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <TextInput label={state.__('title')} attr={'title'} record={entity}
              onChange={updateField} errors={state.currentView.errors} /><br/>
            <SelectInput label={state.__('Category')} attr={'category'} record={entity}
              optionsrecord={state.options}
              optionsattr={'categories'}
              onChange={updateField} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <DateInput label={state.__('published')} attr={'published_at'} record={entity}
              onChange={updateField} /><br/>
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

}

export default PostEditView
