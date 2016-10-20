import React from 'react'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import { observable, toJS } from 'mobx'

@observer
class LoginForm extends React.Component {

  static propTypes = {
    onLoginSubmitted: React.PropTypes.func.isRequired
  }

  @observable credentials = {
    uname: '',
    pwd: ''
  }
  @observable submitted = false

  handleSubmit(e) {
    e.preventDefault()
    this.submitted = true
    this.props.onLoginSubmitted(toJS(this.credentials)).catch((err)=>{
      this.submitted = false
    })
  }

  render() {
    return (
      <Card style={{ margin: '1em'}}>
        <CardTitle title={'login'} />

        <form style={{ padding: '0 1em 1em 1em' }}>
          <TextField name={'uname'} floatingLabelText={'uname'}
            value={this.credentials.uname} onChange={(e)=>{this.credentials.uname = e.target.value}} />
          <br/>
          <TextField name={'pwd'} floatingLabelText={'pwd'} type={'password'}
            value={this.credentials.pwd} onChange={(e)=>{this.credentials.pwd = e.target.value}} />
        </form>

        <CardActions>
          <RaisedButton onTouchTap={this.handleSubmit.bind(this)} label={'login'} disabled={this.submitted} />
        </CardActions>
      </Card>
    )
  }

}

export default class LoginView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

  login(credentials) {
    return this.props.state.login(credentials).then((user) => {
      browserHistory.push('/')
    })
  }

  render() {
    return <LoginForm onLoginSubmitted={this.login.bind(this)} />
  }

}
