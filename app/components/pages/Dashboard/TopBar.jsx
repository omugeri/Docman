import React from 'react';
import { browserHistory } from 'react-router';
import { FlatButton, AppBar } from 'material-ui';


export default class Base extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout = () => {
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  };
  render() {
    return (
      <AppBar
        title="DOCMAN"
        iconElementRight={<FlatButton
          label="Logout"
          onClick={this.logout}
        />}
      />
    );
  }

}
