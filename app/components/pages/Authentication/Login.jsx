import React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton, RaisedButton, TextField } from 'material-ui';
import LoginComp from './LoginComp.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from '../../../shared/styles/styles.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#212121',
    secondaryTextColor: '#757575',
    canvasColor: '#9c27b0',
    borderColor: '#BDBDBD'

  }
});
export default class Login extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

    render() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
        />,
      ];
        return (<div>
                  <div >
                    <MuiThemeProvider  muiTheme={getMuiTheme(docManTheme)}>
                      <Dialog
                        title="Login Dialog"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                      >
                      <LoginComp />
                      </Dialog>
                    </MuiThemeProvider>
                    </div>
                </div>
               );
		}
}
