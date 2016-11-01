import React from 'react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import SelectInput from 'react-mobx-admin/mui/input/select'
import MUIBoolInput from 'react-mobx-admin/mui/input/bool'
import MUIEditView from 'react-mobx-admin/mui/view/edit'


class TagsEditView extends MUIEditView {

  render() {
    const { state } = this.props
    const __ = state.transl.bind(state)
    const updateField = this.updateField.bind(this)
    const form = (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={__('name')} attr={'name'} record={state.currentView.entity} onChange={updateField}
            errors={state.currentView.errors} /><br/>
          <MUIBoolInput label={__('Published')} attr={'published'} record={state.currentView.entity} onChange={updateField} />
        </div>
      </div>
    )

    // let rendering of actual components to parent (in this case it uses MatUI)
    return this.renderComponents({
      edittitle: 'edit tag', createtitle: 'create new tag',
      saveText: 'SAVE', saveAndReturnText: 'SAVE and return',
      form
    })
  }

}

export default TagsEditView
