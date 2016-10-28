import React from 'react';
import { Link } from 'react-router';
import styles from '../../../shared/styles/styles.css';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

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
    accent1Color: '#4CAF50',
  }
});

export default class Base extends React.Component {
  render() {
    return (
      <div className={style.main}>
      <h1>DOCMAN</h1>

      </div>
    )
  }

}
