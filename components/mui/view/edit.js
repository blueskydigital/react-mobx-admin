import React from 'react'
import { observer } from 'mobx-react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
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

const GlobalErrors = observer(({errors}) => {
  return errors ? (
    <ul>{errors.map((e, idx) => (<li key={idx} style={{color: 'red'}}>{e}</li>))}</ul>
  ) : null
})

const MUIEditView = observer( ({state, children}) => {

  const cv = state.currentView
  const loading = (! cv.entity) || cv.loading

  if(loading) {
    return <CircularProgress />
  }

  const title = cv.originEntityId ?
    (cv.edittitle || 'edit item') :
    (cv.createtitle || 'create new item')
  const saveText = cv.saveText || 'SAVE'

  function onSaveAndReturn() {
    state.saveData().then(()=>{
      cv.onReturn2list()
    }).catch(state.onError.bind(state))
  }

  return (
    <Card style={{ margin: '1em'}}>
      <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
        <SubmitButton onSubmit={cv.onSaved} errors={cv.errors} text={saveText} />
      </CardActions>

      <CardTitle title={title} subtitle={cv.desc} />

      <form style={{ padding: '0 1em 1em 1em' }}>
        {children}
        <GlobalErrors errors={cv.errors.get('_global')} />
      </form>

      <CardActions>
        <SubmitButton errors={cv.errors} text={saveText}
          onSubmit={() => state.saveData().catch(state.onError.bind(state))} />
        <SubmitButton onSubmit={onSaveAndReturn} errors={cv.errors}
          text={cv.saveAndReturnText || 'SAVE and return'} />
        <RaisedButton label={'cancel'} icon={<SaveIcon />} onTouchTap={cv.onReturn2list}/>
      </CardActions>
    </Card>
  )
})
export default MUIEditView
