import React from 'react'
import { observer } from 'mobx-react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import SelectInput from 'react-mobx-admin/mui/input/select'
import EditPageBase from 'react-mobx-admin/components/page/edit'
import MUIEditView from 'react-mobx-admin/mui/view/edit'


@observer
class TagsEditView extends MUIEditView {

  render() {
    const { state, updateField } = this.props
    const __ = state.transl.bind(state)
    const form = (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={__('name')} attr={'name'} record={state.entity} onChange={updateField} validators={[
            {fn: (val) => (val.length === 0), message: __('value must be provided')},
            {fn: (val) => (val.length > 10), message: __('value too long')},
          ]} errors={state.errors} /><br/>
          <TextInput label={__('Published')} attr={'published'} record={state.entity} onChange={updateField} />
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

export default class TagsEditPage extends EditPageBase {

  static defaultProps = {
    entityName: 'tags'
  }

  render() {
    return (
      <TagsEditView state={this.props.state}
        saveData={this.save.bind(this)}
        return2List={this.return2List.bind(this)}
        updateField={this.updateField.bind(this)} />
    )
  }

}
