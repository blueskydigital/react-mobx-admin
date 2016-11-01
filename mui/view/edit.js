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

    return errors ? (
      <RaisedButton label={text} primary={true} icon={<SaveIcon />}
        disabled={errors.size > 0} onTouchTap={this.props.onSubmit}/>
    ) : null
  }
}

export default class MUIEditView extends EditFormBase {

  render() {
    const { state } = this.props

    const title = state.currentView.originEntityId ?
      (state.currentView.edittitle || 'edit item') :
      (state.currentView.createtitle || 'create new item')
    const saveText = state.currentView.saveText || 'SAVE'

    return (
      <Card style={{ margin: '1em'}}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.currentView.errors} text={saveText} />
        </CardActions>

        <CardTitle title={title} subtitle={state.currentView.desc} />

        <form style={{ padding: '0 1em 1em 1em' }}>{this.renderForm(state)}</form>

        <CardActions>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.currentView.errors} text={saveText} />
          <SubmitButton onSubmit={this.onSaveAndReturn2list.bind(this)} errors={state.currentView.errors}
            text={state.currentView.saveAndReturnText || 'SAVE and return'} />
          <RaisedButton label={'cancel'} icon={<SaveIcon />} onTouchTap={this.onCancel.bind(this)}/>
        </CardActions>
      </Card>
    )
  }
}
