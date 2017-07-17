import React from 'react';
import styles from './Error.css';

export default props => (
  <div className={styles.errorBox}>
    <img src={props.img} />
    <p>{props.content}</p>
  </div>
);
