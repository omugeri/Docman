import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import styles from './shared/styles/styles.css';
import bgimage from 'file!./shared/images/doc_bg.jpeg';
import { purple500 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


const style = {
  backgroundImage: 'url(' + bgimage + ')',
  title: {
    cursor: 'pointer',
  },
  button: {
    primaryColor: purple500,
  },
  palette: {
    primary1Color: purple500,
  },
};
const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#9c27b0',
    secondaryTextColor: '#757575',
    // canvasColor: '#e5b1ff',
    canvasColor: '#fff',

    borderColor: '#BDBDBD',
  },
});

const App = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(docManTheme)}>
    <div className={styles.main} style={style} >
      {props.children}
    </div>
  </MuiThemeProvider>
)
App.propTypes = {
  children: React.PropTypes.node
};
export default App;
