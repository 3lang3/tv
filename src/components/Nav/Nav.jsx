import React from 'react';
import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import styles from './Nav.css'
import classnames from 'classnames';
import Search from 'components/Search';

import Toggle from 'material-ui/Toggle';

import { IconChatBubble } from '../Icons';

import {layoutsChat} from 'actions'

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
        <Link to="/hot" activeClassName={styles.active} className={styles.navItem} >流行</Link>
        <Link to={`/live${this.props.screenItemsUrl}`} activeClassName={styles.active} className={styles.navItem} >正在观看</Link>
        {/*<Link to="/wiki" activeClassName={styles.active} className={styles.navItem} >资讯<span className={styles.lab}>待开放</span></Link>*/}
        <Search />

        <div data-tip="聊天" className={styles.chatSwitch}>
          <Toggle
            defaultToggled={this.props.layouts.chat}
            onToggle={(event, bool) => {
              this.props.layoutsChat()
            }}
          />
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = (state, ownProps) => ({
  layouts: state.layouts,
  screenItemsUrl: state.screenItems.url,
})

const dispatchStateToProps = (dispatch, ownProps) => ({
  layoutsChat: (clas) => dispatch(layoutsChat(clas)),
})



export default connect(mapStateToProps, dispatchStateToProps)(Nav);