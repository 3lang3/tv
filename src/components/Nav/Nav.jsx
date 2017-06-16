import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Link,
  browserHistory,
  IndexRoute,
} from 'react-router';

import styles from './Nav.css'
import classnames from 'classnames';

const returnFetchingLink = (name) => {

}

class Nav extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    return (
      <div className={styles.nav}>
        <Link to="/categorys" activeClassName={styles.active} className={styles.navItem} >游戏</Link>
        <Link to="/recommend" activeClassName={styles.active} className={styles.navItem} >流行</Link>
        <Link to="/live" activeClassName={styles.active} className={styles.navItem} >正在观看</Link>
        <Link to="/wiki" activeClassName={styles.active} className={styles.navItem} >资讯<span className={styles.lab}>待开放</span></Link>
      </div>
    ) 
  }
}

export default Nav;