import React from 'react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import MarkdownInput from 'react-mobx-admin/mui/input/markdown'
import SelectInput from 'react-mobx-admin/mui/input/select'
import MUIEditView from 'react-mobx-admin/mui/view/edit'


class PostEditView extends MUIEditView {

  render() {
    const { state } = this.props
    const updateField = this.updateField.bind(this)
    const __ = state.transl.bind(state)

    const form = (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <TextInput label={__('title')} attr={'title'} record={state.currentView.entity} onChange={updateField} validators={[
              {fn: (val) => (val.length === 0), message: __('title must be provided')},
              {fn: (val) => (val.length > 10), message: __('title too long')},
            ]} errors={state.currentView.errors} /><br/>
            <SelectInput label={__('Category')} attr={'category'} record={state.currentView.entity}
              optionsrecord={state.options}
              optionsattr={'categories'}
              onChange={updateField} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <DateInput label={__('published')} attr={'published_at'} record={state.currentView.entity} onChange={updateField} /><br/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <MarkdownInput label={__('content')} attr={'content'} record={state.currentView.entity} onChange={updateField} validators={[
              {fn: (val) => (val.length === 0), message: __('this is mandatory')}
            ]} errors={state.currentView.errors} mdrender={marked} />
          </div>
        </div>
      </div>
    )

    // let rendering of actual components to parent (in this case it uses MatUI)
    return this.renderComponents({
      edittitle: 'edit post', createtitle: 'create new post',
      saveText: 'SAVE', saveAndReturnText: 'SAVE and return',
      form
    })
  }

}

export default PostEditView
