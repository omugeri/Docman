import React from 'react';
import { FlatButton, AppBar } from 'material-ui';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';


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

export default class Base extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(docManTheme)}>
          <AppBar
              title='DOCMAN'
              iconElementRight={<FlatButton label="Logout" />}
          />
          </MuiThemeProvider>
    );
  }

}
