import React from 'react'
import { observer } from 'mobx-react'
import TextInput from 'react-mobx-admin/mui/input/text'
import DateInput from 'react-mobx-admin/mui/input/date'
import SelectInput from 'react-mobx-admin/mui/input/select'
import EditPageBase from 'react-mobx-admin/components/page/edit'
import MUIEditView from 'react-mobx-admin/mui/view/edit'


@observer
class PostEditView extends MUIEditView {

  componentDidMount() {
    // load all necessary options here
    this.props.state.loadOptions('tags', '/tags')
  }

  render() {
    const { state, updateField } = this.props
    const __ = state.transl.bind(state)

    const form = (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <TextInput label={__('title')} attr={'title'} record={state.entity} onChange={updateField} validators={[
            {fn: (val) => (val.length === 0), message: __('title must be provided')},
            {fn: (val) => (val.length > 10), message: __('title too long')},
          ]} errors={state.errors} /><br/>
          <SelectInput label={__('Category')} attr={'category'} record={state.entity}
            optionsrecord={state.options}
            optionsattr={'categories'}
            onChange={updateField} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <DateInput label={__('published')} attr={'published_at'} record={state.entity} onChange={updateField} /><br/>
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

export default class PostEditPage extends EditPageBase {

  static defaultProps = {
    entityName: 'posts'
  }

  render() {
    return (
      <PostEditView state={this.props.state}
        saveData={this.save.bind(this)}
        return2List={this.return2List.bind(this)}
        updateField={this.updateField.bind(this)} />
    )
  }

}
