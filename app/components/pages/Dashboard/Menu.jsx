import React from 'react';
import { Paper, Menu, MenuItem } from 'material-ui';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Dashboardicon from 'material-ui/svg-icons/action/dashboard.js';
import Usersicon from 'material-ui/svg-icons/action/supervisor-account.js';
import Documentsicon from 'material-ui/svg-icons/action/assignment.js';
import Rolesicon from 'material-ui/svg-icons/action/lock-open.js';


import styles from '../../../shared/styles/styles.css';


const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#fff',
    secondaryTextColor: '#757575',
    canvasColor: '#9c27b0',
    borderColor: '#BDBDBD'
  }
});
const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    height: '92%',
    margin: '0px 0px 0px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  leftIcon: {
    color: '#ffffff'
  }
};

export default class SideMenu extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(docManTheme)}>
        <Paper style={style.paper}>
          <Menu>
            <MenuItem primaryText='Dashboard'
                      leftIcon={<Dashboardicon/>}
                      class='styles.material-icons white'
                      />
            <MenuItem primaryText='Users'
                      leftIcon={<Usersicon />}/>
            <MenuItem primaryText='Documents'
                      leftIcon={<Documentsicon />}/>
            <MenuItem primaryText='Roles'
                      leftIcon={<Rolesicon />}/>
          </Menu>
        </Paper>
        </MuiThemeProvider>
    );
  }

}
