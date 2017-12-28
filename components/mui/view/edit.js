import React from 'react'
import { observer } from 'mobx-react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import { Card, CardTitle, CardActions } from 'material-ui/Card'

const SubmitButton = observer(({store, text, onSubmit}) => {
  return <RaisedButton label={text} primary icon={<SaveIcon />}
    disabled={store.errors.size > 0 || !store.isEntityChanged} onClick={onSubmit} />
})

const GlobalErrors = observer(({errors}) => {
  return errors ? (
    <ul>{errors.map((e, idx) => (<li key={idx} style={{color: 'red'}}>{e}</li>))}</ul>
  ) : null
})

const MUIEditView = observer(({store, onSave, onReturn2list, children}) => {
  if (store.state === 'loading') {
    return <CircularProgress />
  }

  const title = store.origRecordId ? (store.edittitle || 'edit item') : (store.createtitle || 'create new item')
  const saveText = store.saveText || 'SAVE'

  const sumbit = (
    <SubmitButton onSubmit={onSave} text={saveText} store={store} />
  )

  return (
    <Card style={{margin: '1em'}}>
      <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
        {sumbit}
      </CardActions>

      <CardTitle title={title} subtitle={store.desc} />

      <form style={{ padding: '0 1em 1em 1em' }}>
        {children}
        <GlobalErrors errors={store.errors.get('_global')} />
      </form>

      <CardActions>
        {sumbit}
        <SubmitButton onSubmit={() => onSave(onReturn2list)} store={store}
          text={store.saveAndReturnText || 'SAVE and return'} />
        <RaisedButton label={'cancel'} icon={<SaveIcon />} onClick={() => onReturn2list()} />
      </CardActions>
    </Card>
  )
})
export default MUIEditView
