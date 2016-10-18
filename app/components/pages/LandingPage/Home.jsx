import React from 'react';
// import bgimage from 'file!../../../shared/images/book_bg.jpg';
import styles from '../../../shared/styles/styles.css';
import { Link } from 'react-router';


const style = {

    backgroundImage: 'url(/book_bg.jpg)',
    backgroundSize: 'cover',
    height: '600px'
};

export default class Home extends React.Component {
  render() {
    return (
    <div style= {style} >
        <div style>
          <div>
            <h1> DOCMAN </h1>
            <p> Out with the old in with the new. Track files through the whole organization</p>
            <div><Link to="/signup"> GET STARTED </Link></div>
          </div>
        </div>
    </div>
  );
  }
}
