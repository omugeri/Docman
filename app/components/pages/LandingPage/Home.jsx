import React from 'react';
import { Link } from 'react-router';
import styles from '../../../shared/styles/styles.css';
import {purple500} from 'material-ui/styles/colors';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { RaisedButton, AppBar, IconButton } from 'material-ui';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Login from '../Authentication/Login.jsx';
import request from 'superagent';


const style = {
 backgroundImage: 'url(' + bgimage + ')',
 title: {
   cursor: 'pointer',
 },
 button: {
   primaryColor: purple500
 },
 palette: {
    primary1Color: purple500,
  }
};
const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    // primary2Color: '#7B1FA2',
    // primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    // accent2Color: '#8BC34A',
    // textColor: '#212121',
    // secondaryTextColor: '#757575',
    // canvasColor: '#9c27b0',
    // borderColor: '#BDBDBD'

  }
});


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    username: '',
                    password: '',
                    open: false
                  };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsername = (event) => {
      this.setState({username: event.target.value});
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value})

  }

  handleOpen = () => {
    console.log('Gets here');
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = (event) => {
    this.setState({open: false});
    request
      .post('/api/users/login')
      .send({
        userName: this.state.username,
        password: this.state.password,
      })
      .end((err, res) => {
        console.log('response is: ', res.text);
      });
  }
  render() {
    return (
      <div className={styles.main} style={style} >
        <MuiThemeProvider  muiTheme={getMuiTheme(docManTheme)}>
          <div className={styles.color_}>
            <RaisedButton
              secondary= 'true'
              label="login"
              onTouchTap ={this.handleOpen}
              className={styles.button}
              />

            <Login open={this.state.open}
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
              secondary='true'
              label="GET STARTED"
                />
            </div>
          </div>

        </MuiThemeProvider>
      </div>

  );
  }
}
