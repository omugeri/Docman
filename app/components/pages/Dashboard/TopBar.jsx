import React from 'react';
import { browserHistory } from 'react-router';
import { FlatButton, AppBar } from 'material-ui';
import { logoutAction, errorSet } from '../../../actions/authActions';
import { connect } from 'react-redux';
import Search from './Search.jsx';


class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout = () => {
    this.props.errorSet('');
    this.props.logoutAction();
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  };
  render() {
    return (
      <AppBar
        title="DOCMAN"
        iconElementLeft={<Search />}
        iconElementRight={<FlatButton
          label="Logout"
          onClick={this.logout}
        />}
      />
    );
  }

}
function mapStateToProps(state) {
  return {
    error: state.auth.error,
    user: window.localStorage.getItem('username'),
  };
}
export default connect(mapStateToProps, { logoutAction, errorSet })(TopBar);
