import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Screen from 'components/Screen';
import styles from './Stage.css';

export const stage = () => (
  <div className={styles.stage}>
    <Header />
    <Screen />
  </div>
  );

const mapStateToProps = state => ({
  open: state.layouts.open,
});

export default connect(mapStateToProps)(stage);
