import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { purple500 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import bgimage from 'file!./shared/images/doc_bg.jpeg';
import styles from './shared/styles/styles.css';

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
    textColor: '#000019',
    alternateTextColor: '#fff',
    secondaryTextColor: '#757575',
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
);

App.propTypes = {
  children: React.PropTypes.node,
};
export default App;
