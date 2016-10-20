import React from 'react'
import { observer } from 'mobx-react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import RaisedButton from 'material-ui/RaisedButton'
import EditFormBase from '../../components/edit/form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'

@observer
class SubmitButton extends React.Component {
  render() {
    const { errors, text } = this.props
    const submitDisabled = errors.size > 0

    return (
      <RaisedButton label={text} primary={true} icon={<SaveIcon />}
        disabled={submitDisabled} onTouchTap={this.props.onSubmit}/>
    )
  }
}

@observer
class MUIEditForm extends EditFormBase {

  render() {
    const { edittitle, createtitle, desc, state, saveText, onSaveData, saveAndReturnText } = this.props

    const title = state.originEntityId ? edittitle : createtitle

    return (
      <Card style={{ margin: '1em'}}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.errors} text={saveText} />
        </CardActions>

        <CardTitle title={title} subtitle={desc} />

        <form style={{ padding: '0 1em 1em 1em' }}>
          {<this.props.formcomponent onChange={this.updateField.bind(this)} state={state} />}
        </form>

        <CardActions>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.errors} text={saveText} />
          <SubmitButton onSubmit={this.onSaveAndReturn2list.bind(this)} errors={state.errors} text={saveAndReturnText || 'save and return'} />
          <RaisedButton label={'cancel'} icon={<SaveIcon />} onTouchTap={this.onCancel.bind(this)}/>
        </CardActions>
      </Card>
    )
  }
}
export default MUIEditForm
