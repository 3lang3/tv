import React from 'react';
import styles from './SolarStystem.css';

export default () => (
  <div className={styles.container}>
    <div className={styles.solarSyst}>
      <div className={styles.sun} />
      <div className={styles.mercury} />
      <div className={styles.venus} />
      <div className={styles.earth} />
      <div className={styles.mars} />
      <div className={styles.jupiter} />
      <div className={styles.saturn} />
      <div className={styles.uranus} />
      <div className={styles.neptune} />
      <div className={styles.pluto} />
      <div className={styles.asteroidsSelt} />
    </div>
  </div>
);
