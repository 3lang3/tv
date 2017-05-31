import React from 'react';
import styles from './SolarStystem.css';

export default  () => (
    <div className={styles.container}>
        <div className={styles.solarSyst}>
            <div className={styles.sun}></div>
            <div className={styles.mercury}></div>
            <div className={styles.venus}></div>
            <div className={styles.earth}></div>
            <div className={styles.mars}></div>
            <div className={styles.jupiter}></div>
            <div className={styles.saturn}></div>
            <div className={styles.uranus}></div>
            <div className={styles.neptune}></div>
            <div className={styles.pluto}></div>
            <div className={styles.asteroidsSelt}></div>
        </div>
    </div>
)