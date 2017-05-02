import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'


const LoginView = ({store}) => {

  return (
    <Card style={{ margin: '1em'}}>
      <CardTitle title={'login'} />

      <form style={{ padding: '0 1em 1em 1em' }}>
        <TextField name={'uname'} floatingLabelText={'uname'}
          value={store.router.cv.uname} onChange={(e)=>{
            store.router.cv.uname = e.target.value}
          } />
        <br/>
        <TextField name={'pwd'} floatingLabelText={'pwd'} type={'password'}
          value={store.router.cv.pwd} onChange={(e)=>{store.router.cv.pwd = e.target.value}} />
      </form>

      <CardActions>
        <RaisedButton onTouchTap={store.performLogin.bind(store)}
          label={'login'} disabled={store.router.cv.submitted} />
      </CardActions>
    </Card>
  )
}

export default observer(['store'], LoginView)
