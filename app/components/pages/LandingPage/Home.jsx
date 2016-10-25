import React from 'react';
import { Link } from 'react-router';
import styles from '../../../shared/styles/styles.css';
import {purple500} from 'material-ui/styles/colors';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { RaisedButton, AppBar, IconButton } from 'material-ui';
import bgimage from 'file!../../../shared/images/book_bg.jpg';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


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
function handleTouchTap() {
  
}


export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.main} style={style} >
        <MuiThemeProvider  muiTheme={getMuiTheme(docManTheme)}>
            <div className={styles.overlay}>
              <div className={styles.color_}>
              <AppBar
                iconElementRight={
                  <RaisedButton
                    secondary='true'
                    label="login"
                    onTouchTap ={this.handleTouchTap}
                    //containerElement={<Link to="/login" />}
                    className={style.button}
                    />
                  }
              />
                <h1> DOCMAN </h1>
                <p> Out with the old in with the new.</p>
                <p>Track files through the whole organization</p>
                  <div>
                    <RaisedButton
                    className={styles.action}
                    secondary='true'
                    label="GET STARTED"
                    containerElement={<Link to="/signup" />}/>
                  </div>
              </div>
            </div>
        </MuiThemeProvider>
      </div>

  );
  }
}
