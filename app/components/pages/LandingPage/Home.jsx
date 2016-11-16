import React from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { purple500 } from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { RaisedButton, AppBar, IconButton } from 'material-ui';
import request from 'superagent';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import styles from '../../../shared/styles/styles.css';
import { loginAction } from '../../../actions/authActions'
import Login from '../Authentication/Login.jsx';

const style = {
  backgroundImage: 'url(' + bgimage + ')',
  title: {
    cursor: 'pointer',
  },
  button: {
    primaryColor: purple500,
  },
  palette: {
    primary1Color: purple500,
  },
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      open: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    request
      .post('/api/users/login')
      .send({
        userName: this.state.username,
        password: this.state.password,
      })
      .end((err, res) => {
        if (res.text) {
          const token = res.text;
          window.localStorage.setItem('token', token);
          console.log(token);
          browserHistory.push('/dashboard');
        }
      });
  }

  render() {
    return (
      <div className={styles.main} style={style} >
          <div className={styles.color_}>
            <RaisedButton
              secondary
              label="login"
              onTouchTap={this.handleOpen}
              className={styles.button}
            />

            <Login
              open={this.state.open}
              handleClose={this.handleClose}
              handleSubmit={this.handleSubmit}
              handlePassword={this.handlePassword}
              handleUsername={this.handleUsername}
              username={this.state.username}
              password={this.state.password}
            />

            <h1> DOCMAN </h1>
            <p> Out with the old in with the new.</p>
            <p>Track files through the whole organization</p>
            <div>
              <RaisedButton
                className={styles.action}
                secondary
                label="GET STARTED"
              />
            </div>
          </div>

      </div>

  );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
