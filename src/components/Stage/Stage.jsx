import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Header from 'components/Header';
import Screen from 'components/Screen';
import styles from './Stage.css';

export const stage = (props) => {
  //const isOpen = props.open ? 'miniStage' : '';
  return (
    <div className={styles.stage}>
      <Header />
      <Screen />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    open: state.layouts.open,
})

export default connect(mapStateToProps)(stage)