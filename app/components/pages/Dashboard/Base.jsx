import React from 'react';
import { Link } from 'react-router';
import styles from '../../../shared/styles/styles.css';
import bgimage from 'file!../../../shared/images/doc_bg.jpeg';
import TopBar from './TopBar.jsx';
import SideMenu from './Menu.jsx';

const style = {
  backgroundImage: 'url(' + bgimage + ')',
  title: {
    cursor: 'pointer',
  },
};

export default function Base() {
  return (
    <div className={styles.main} style={style}>
      <div>
        <TopBar />
        <SideMenu />

      </div>
    </div>
  );
}
