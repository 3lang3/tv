import React from 'react';

import styles from './Search.css';
import { 
  IconFdj
} from '../Icons';

export default (props) => (
    <section className={styles.searchBar} style={{
        width: props.width,
    }}>
        <input type="text" placeholder="Search" />
        <div className={styles.fdjico}>
            <IconFdj />
        </div>
    </section>
)