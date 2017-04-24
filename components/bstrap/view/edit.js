import React from 'react'
import { observer } from 'mobx-react'

const SubmitButton = observer(({ errors, text, onSubmit }) => (
  errors ? (
    <button type="button" className="btn btn-primary" disabled={errors.size > 0} onClick={onSubmit}>{text}</button>
  ) : null
))

const GlobalErrors = observer(({errors}) => {
  return errors ? (
    <ul>{errors.map((e, idx) => (<li key={idx} style={{color: 'red'}}>{e}</li>))}</ul>
  ) : null
})

const BStrapEditView = observer( ({state, children}) => {

  const cv = state.currentView
  const loading = (! cv.entity) || cv.loading

  if(loading) {
    return <span className="is-loading">loading</span>
  }

  const title = cv.originEntityId ?
    (cv.edittitle || 'edit item') :
    (cv.createtitle || 'create new item')
  const saveText = cv.saveText || 'SAVE'

  function onSaveAndReturn() {
    cv.onSaved().then(()=>{
      cv.onReturn2list()
    })
  }

  const actionButtons = (
    <div className="btn-group" role="group">
      <SubmitButton onSubmit={cv.onSaved} errors={cv.errors} text={saveText} />
      <SubmitButton onSubmit={onSaveAndReturn} errors={cv.errors}
        text={cv.saveAndReturnText || 'SAVE and return'} />
      <button type="button" className="btn btn-secondary btn-default" onClick={cv.onReturn2list}>cancel</button>
    </div>
  )

  return (
    <div className="card">
      <div className="card-block">
        <h4 className="card-title">{title}</h4>
        { actionButtons }
      </div>

      <div className="card-block">
        <form>{children}</form>
        <GlobalErrors errors={cv.errors.get('_global')} />
      </div>

      <div className="card-block">
        { actionButtons }
      </div>
    </div>
  )
})
export default BStrapEditView
