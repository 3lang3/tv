import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './Spinner.css';


const Spinner = ({ size = 59.5, color = '#6441a4' }) => (
  <div className={styles.container}>
    <CircularProgress size={Math.max(size, 4)} color={color} />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Spinner;
