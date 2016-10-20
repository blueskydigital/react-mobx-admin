import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer
export default class Header extends React.Component {

  userInfo() {
    const user = this.props.state.loggedUser;
    if(user) {
      return <span>{user.name} ({user.uname})</span>;
    } else {
      return <span>anonymous</span>
    }
  }

  render() {
    return (
      <header className="header">
        <h1>
          <Link to="/">
            {this.props.title} | custom header
          </Link>
        </h1>
        <div className="pull-right">
          {this.userInfo()}
        </div>
      </header>
    );
  }

}
