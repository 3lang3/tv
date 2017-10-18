import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Search from 'components/Search';
import Toggle from 'material-ui/Toggle';
import { layoutsChat } from 'actions';

import styles from './Nav.css';

const Nav = (props) => (
  <div className={styles.nav}>
    <Link to="/hot" activeClassName={styles.active} className={styles.navItem} >流行</Link>
    <Link to="/categorys" activeClassName={styles.active} className={styles.navItem} >所有游戏</Link>
    <Link to={`/live${props.screenItemsUrl}`} activeClassName={styles.active} className={styles.navItem} >正在观看</Link>
    {/* <Link to="/wiki" activeClassName={styles.active} className={styles.navItem} >资讯<span className={styles.lab}>待开放</span></Link>*/}
    <Search />

    <div data-tip="聊天" className={styles.chatSwitch}>
      <Toggle
        defaultToggled={props.layouts.chat}
        onToggle={(event, bool) => {
          props.layoutsChat();
        }}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  layouts: state.layouts,
  screenItemsUrl: state.screenItems.url,
});

const dispatchStateToProps = dispatch => ({
  layoutsChat: clas => dispatch(layoutsChat(clas)),
});


export default connect(mapStateToProps, dispatchStateToProps)(Nav);
