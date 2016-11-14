import React from 'react';
import { Link } from 'react-router';
import styles from '../../../shared/styles/styles.css';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';
import { FlatButton} from 'material-ui';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TopBar from './TopBar.jsx';
import SideMenu from './Menu.jsx';

const style = {
 backgroundImage: 'url(' + bgimage + ')',
 title: {
   cursor: 'pointer',
 }
};
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

export default class Base extends React.Component {
  render() {
    return (
      <div className={styles.main} style={style}>
        <div>
          <TopBar />
          <SideMenu />

        </div>
      </div>
    );
  }

}
