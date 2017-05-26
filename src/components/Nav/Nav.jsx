import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Link,
  browserHistory,
  IndexRoute,
} from 'react-router';

import Logo from 'components/Logo';
import styles from './Nav.css'
import classnames from 'classnames';
import {Github, Cheese, Bug} from 'components/Footer';

const returnFetchingLink = (name) => {

}

class Nav extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    return (
      <div className={styles.nav}>
        <Link data-tip="所有主播" to="/category/all" activeClassName={styles.active} className={classnames(styles.navItem, styles.logoNav)} > 
          <Logo />
        </Link>
        <Link data-tip="DOTA2" to="/category/dota2" activeClassName={styles.active} className={styles.navItem} > 
          <img src={require('../../../assets/dota2.png')} />
        </Link>
        <Link data-tip="英雄联盟" to="/category/lol" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/lol.png')} />
        </Link>
        <Link data-tip="CSGO" to="/category/csgo" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/csgo.png')} />
        </Link>
        <Link data-tip="主机游戏" to="/category/tvgame" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/tvgame.png')} />
        </Link>
        <Link data-tip="炉石" to="/category/hearthstone" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/hearthstone.png')} />
        </Link>
        <Link data-tip="星际争霸" to="/category/starcraft" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/starcraft.png')} />
        </Link>
        <Link data-tip="娱乐" to="/category/girls" activeClassName={styles.active} className={styles.navItem}>
          <img src={require('../../../assets/girl.png')} />
        </Link>

        <section className={styles.copySec}>
          <Github />
          <Cheese />
          {/*<Bug />*/}
        </section>
      </div>
    )
  }
}

export default Nav;