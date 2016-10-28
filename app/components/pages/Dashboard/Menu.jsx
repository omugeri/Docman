import React from 'react';
import { Paper, Menu, MenuItem } from 'material-ui';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Dashboardicon from 'material-ui/svg-icons/action/dashboard.js';
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
    height: '89%',
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
            <MenuItem primaryText='Dashboard' leftIcon={<Dashboardicon className={styles.material-icons.md-light}/>}/>
            <MenuItem primaryText='Users' />
            <MenuItem primaryText='Documents' />
            <MenuItem primaryText='Roles' />
          </Menu>
        </Paper>
        </MuiThemeProvider>
    );
  }

}
