import React from 'react';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import styles from '../../../shared/styles/styles.css';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';


const style = {
  backgroundImage: 'url(' + bgimage + ')',
  title: {
    cursor: 'pointer',
  },
};

export default class ErrorPage extends React.Component {
  constructor(props) {
    super();
    this.goBack = this.goBack.bind(this);
  }
  goBack = () => {
    browserHistory.push('/dashboard');
  }
  render() {
    return (
      <div className={styles.main} style={style}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '20%' }}>
          <p >
          Sorry the page you requested cannot be found or is forbidden.
          Contact your system administrator for more information.
          </p>
          <RaisedButton
            label="Back"
            onTouchTap={this.goBack}
            secondary={true}
          />
        </div>
      </div>
    );
  }
}
