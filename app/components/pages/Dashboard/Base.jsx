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
