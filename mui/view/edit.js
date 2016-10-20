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
class MUIEditView extends EditFormBase {

  renderComponents(props2) {
    const { state, onSaveData } = this.props

    const title = state.originEntityId ? props2.edittitle : props2.createtitle

    return (
      <Card style={{ margin: '1em'}}>
        <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.errors} text={props2.saveText} />
        </CardActions>

        <CardTitle title={title} subtitle={props2.desc} />

        <form style={{ padding: '0 1em 1em 1em' }}>{props2.form}</form>

        <CardActions>
          <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.errors} text={props2.saveText} />
          <SubmitButton onSubmit={this.onSaveAndReturn2list.bind(this)} errors={state.errors} text={props2.saveAndReturnText} />
          <RaisedButton label={'cancel'} icon={<SaveIcon />} onTouchTap={this.onCancel.bind(this)}/>
        </CardActions>
      </Card>
    )
  }
}
export default MUIEditView
