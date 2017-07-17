import React from 'react';
import styles from './Logo.css';

import {
  IconLogo,
  IconName,
} from '../Icons';

export default () => (
  <section className={styles.brand}>
    <div className={styles.logo}>
      <IconLogo width="35px" height="35px" />
    </div>
    {/* <div className={styles.name}>
            <IconName fill="#656565" />
        </div>*/}
  </section>
);
