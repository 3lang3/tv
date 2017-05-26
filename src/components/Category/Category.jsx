import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import styles from './Category.css';
import CategoryItem from 'components/CategoryItem';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconZoom, IconMini } from 'components/Icons';
import { forceCheck } from 'react-lazyload';

import { Scrollbars } from 'react-custom-scrollbars';
import IconButton from 'material-ui/IconButton';
import CloseIco from 'material-ui/svg-icons/navigation/close';

import {layoutsWidth, layoutsOpen, filterCategorys} from 'actions';

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
    this.toggleWidth = this.toggleWidth.bind(this)
    this.filterHander = this.filterHander.bind(this)
    //this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  filterHander(clas) {
    this.props.filterCategorys(clas)
  }

  toggleWidth() {
    this.props.layoutsWidth()
  }

  componentWillUpdate(props, newProps) {
    if(props.items.length == 0 && !props.layouts.open) {
        props.layoutsOpen(true)
    }
  }

  componentDidUpdate() {
    forceCheck()
  }

  render() {
    const typeName = preTypeTitle(this.props);
    const isOpen = this.props.layouts.open ? '' : 'tvHide';
    const isWidth = this.props.layouts.width ? 'tvWidth' : '';
    const loading = this.props.data.loading;
    const isError = this.props.data.error;
    const items = this.props.data.data;
    const filterName = this.props.data.filter;

    let itemsHtml = [];
    let itemsPlatform = [''];

    if(items instanceof Array) {
      items.forEach((item, key) => {
        if(itemsPlatform.indexOf(item.platform) == -1 ) itemsPlatform.push(item.platform);
        itemsHtml.push(<CategoryItem filter={this.props.filter} key={key} item={item} type="category" />)
      })
    }


    
    return (
      <div className={classnames(styles.tv, styles[isOpen], styles[isWidth])}>
        <div className={styles.topSec}>
          <IconButton
            onClick={this.toggleWidth}
          >
          { this.props.width ? <IconMini fill="#646464" /> : <IconZoom fill="#646464" />}
          </IconButton>
          {
            this.props.items.length > 0 
                ?<IconButton
                    tooltip="关闭"
                    onClick={() => {
                      if(this.props.items.length > 0) {
                        this.props.layoutsOpen(false)
                      }
                    }}
                  >
                    <CloseIco />
                  </IconButton>
                : ''
          }
        </div>

        <div className={styles.categoryTitle}>
            <h2>{typeName}</h2>
            <section className={styles.chipSec}>
              {
                itemsPlatform.length > 1 && itemsPlatform.map((platform, key) => {
                  {/*if(platform == 'douyu') platform = '斗鱼';
                  if(platform == 'twitch') platform = 'Twitch';
                  if(platform == 'huomao') platform = '火猫';
                  if(platform == 'huya') platform = '虎牙';
                  if(platform == 'douyuvideo') platform = '斗鱼视频';*/}
                  return <span className={ filterName == platform ? styles.active : '' } onClick={() => this.filterHander(platform)} key={key}>{platform || 'All'}</span>
                })
              }
            </section>
        </div>
        
        <Scrollbars className={styles.tvItemBox}>
          <section className={styles.flexWrapper}>
            {loading ? <Spinner size={50} color="#fff" /> : ''}
            {isError ? <Error img={require('../../../assets/error_fetch.svg')} content='Ooops,服务器好像出了点小问题' /> : itemsHtml }
          </section>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    data: state.categorys,
    layouts: state.layouts,
    filter: state.categorys.filter,
    items: state.screenItems,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  filterCategorys: (clas) => dispatch(filterCategorys(clas)),
  layoutsWidth: (clas) => dispatch(layoutsWidth(clas)),
  layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})

export default connect(mapStateToProps, mapDispatchToProps)(getCategory)