import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Category.css';
import CategoryItem from 'components/CategoryItem';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconZoom, IconMini } from 'components/Icons';

import { Scrollbars } from 'react-custom-scrollbars';
import IconButton from 'material-ui/IconButton';
import CloseIco from 'material-ui/svg-icons/navigation/close';

import {layoutsWidth, layoutsOpen} from 'actions';

const preTypeTitle = (props) => {
  switch(props.type.name) {
    case 'dota2':
     return 'Dota2';
    case 'lol':
      return '英雄联盟';
    case 'csgo':
      return 'CSGO';
    case 'tvgame':
      return '主机游戏';
    case 'hearthstone':
      return '炉石传说';
    case 'starcraft':
      return '星际争霸';
    case 'girls':
      return '娱乐主播';
    default:
      return '全网主播';
  }
}

class getCategory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate(props, newProps) {
    if(props == newProps) return false;
  }

  render() {
    const typeName = preTypeTitle(this.props);
    const isOpen = this.props.open ? '' : 'tvHide';
    const isWidth = this.props.width ? 'tvWidth' : '';
    const loading = this.props.data.loading;
    const isError = this.props.data.error;
    const items = this.props.data.data;
    let itemsHtml = [];

    if(items instanceof Array) {
      items.forEach((item, key) => {
        itemsHtml.push(<CategoryItem key={key} item={item} />)
      })
    }
    
    return (
      <div id="categoryContainer" className={classnames(styles.tv, styles[isOpen], styles[isWidth])}>
        <IconButton
          className={styles.zoom}
          onClick={() => this.props.layoutsWidth()}
        >
        { this.props.width ? <IconMini fill="#646464" /> : <IconZoom fill="#646464" />}
        </IconButton>
        <IconButton
          className={styles.setting}
          tooltip="关闭"
          onClick={() => this.props.layoutsOpen(false) }
        >
          <CloseIco />
        </IconButton>
        <h2>{typeName}</h2>
        <Scrollbars className={styles.tvItemBox}>
          {loading ? <Spinner size={50} color="#fff" /> : ''}
          {isError ? <Error img={require('../../../assets/error_fetch.svg')} content='Ooops,服务器好像出了点小问题' /> : itemsHtml }
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    data: state.categorys,
    width: state.layouts.width,
    open: state.layouts.open,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  layoutsWidth: (clas) => dispatch(layoutsWidth(clas)),
  layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})

export default connect(mapStateToProps, mapDispatchToProps)(getCategory)