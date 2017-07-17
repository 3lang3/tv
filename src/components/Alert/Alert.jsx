import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import styles from './Alert.css';

const Alert = (props) => {
  const { open, message, duration } = props.alert;

  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={duration}
      className={styles.alert}
    />
  );
};

const mapStateToProps = state => ({
  alert: state.alert,
});


export default connect(mapStateToProps)(Alert);
