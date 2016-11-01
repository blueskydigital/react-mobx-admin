import React from 'react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import SelectInput from 'react-mobx-admin/mui/input/select'
import MUIBoolInput from 'react-mobx-admin/mui/input/bool'
import MUIEditView from 'react-mobx-admin/mui/view/edit'


class TagsEditView extends MUIEditView {

  renderForm(state) {
    const entity = state.currentView.entity
    const updateField = this.updateField.bind(this)
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={state.__('name')} attr={'name'} record={entity} onChange={updateField}
            errors={state.currentView.errors} /><br/>
          <MUIBoolInput label={state.__('Published')} attr={'published'} record={entity} onChange={updateField} />
        </div>
      </div>
    )
  }

}

export default TagsEditView
