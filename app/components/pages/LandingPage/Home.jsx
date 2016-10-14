import React from 'react';
import bgimage from 'file!../../../shared/images/landing_page.png';
import styles from '../../../shared/styles/styles.css';
import { Link } from 'react-router';


const style = {
 backgroundImage: 'url(' + bgimage + ')'
};

export default class Home extends React.Component {
  render() {
    <div >
        <div className={styles.main} style = {style}>
          <div className={styles.color-overlay}>
            <h1> DOCMAN </h1>
            <p> Out with the old in with the new. Track files through the whole organization</p>
            <div className={}><Link to="/signup"> GET STARTED </Link></div>
            <div className={}>
              <img src={laptop}/>
            </div>
          </div>
        </div>
        <div>
  }
}
