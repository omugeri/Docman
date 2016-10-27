import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, RaisedButton, TextField } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../../shared/styles/styles.css';
injectTapEventPlugin();

const Dstyle = {
  height: '100%',
  maxHeight: 'none',
  width: '25%',
  maxWidth: 'none',

};
export default class Login extends React.Component {

    render() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.props.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.props.handleSubmit}
        />,
      ];
        return (
          <div >
              <Dialog
                title="Login Dialog"
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                contentStyle={Dstyle}
              >
              <div>
                  <form>
                  <TextField
                    floatingLabelText="UserName"
                    name="username"
                    value={this.props.username}
                    onChange={this.props.handleUsername}
                  /><br />
                  <br />
                  <TextField
                    type='password'
                    name='password'
                    value={this.props.password}
                    onChange={this.props.handlePassword}

                  /><br />
                  </form>
              </div>
              </Dialog>
         </div>
         );
		}
}
