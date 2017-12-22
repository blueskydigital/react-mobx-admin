import React from 'react'
import { observer } from 'mobx-react'
import SaveIcon from 'material-ui/svg-icons/content/save'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import { Card, CardTitle, CardActions } from 'material-ui/Card'

const SubmitButton = observer( ({errors, text, onSubmit, hasChanged}) => {
  return errors ? (
    <RaisedButton label={text} primary={true} icon={<SaveIcon />}
      disabled={errors.size > 0 || ! hasChanged()} onClick={onSubmit}/>
  ) : null
})

const GlobalErrors = observer(({errors}) => {
  return errors ? (
    <ul>{errors.map((e, idx) => (<li key={idx} style={{color: 'red'}}>{e}</li>))}</ul>
  ) : null
})

const MUIEditView = observer( ({store, onSave, onReturn2list, children}) => {

  const cv = store.cv

  if (cv.state === 'loading') {
    return <CircularProgress />
  }

  const title = cv.origRecordId ?
    (cv.edittitle || 'edit item') :
    (cv.createtitle || 'create new item')
  const saveText = cv.saveText || 'SAVE'

  const sumbit = (
    <SubmitButton onSubmit={onSave} errors={cv.errors}
      text={saveText} hasChanged={()=>(store.isEntityChanged)} />
  )

  return (
    <Card style={{ margin: '1em'}}>
      <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
        {sumbit}
      </CardActions>

      <CardTitle title={title} subtitle={cv.desc} />

      <form style={{ padding: '0 1em 1em 1em' }}>
        {children}
        <GlobalErrors errors={cv.errors.get('_global')} />
      </form>

      <CardActions>
        {sumbit}
        <SubmitButton onSubmit={()=>onSave(onReturn2list)} errors={cv.errors}
          text={cv.saveAndReturnText || 'SAVE and return'}
          hasChanged={()=>(store.isEntityChanged)} />
        <RaisedButton label={'cancel'} icon={<SaveIcon />} onClick={()=>onReturn2list()}/>
      </CardActions>
    </Card>
  )
})
export default MUIEditView
