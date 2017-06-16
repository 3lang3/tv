import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import LazyLoad from 'react-lazyload';
import styles from './CategoryItem.css';
import classnames from 'classnames';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import PlayAdd from 'material-ui/svg-icons/av/playlist-add';
import FavoriteBroIco from 'material-ui/svg-icons/action/favorite-border';
import FavoriteIco from 'material-ui/svg-icons/action/favorite';

import {screensActive, screenItemsAdd, screenItemsRemove, layoutsOpen, alertOpen, addFavorite, removeFavorite} from 'actions';

const getClassType = (type) => {
    switch(type) {
        case 'category':
            return 'tvItem';
        case 'search':
            return 'search';
        case 'screen':
            return 'screen';
        default:
            return '';
    }
}

const isFavorite = (item, favoriteList) => {
  let _target = false;

  if(favoriteList instanceof Array) {
    favoriteList.forEach((list, index) => {
      if(item.roomId == list.roomId && item.anchor == list.anchor) {
        _target = true;
      }
    })
  }else {
    _target = false;
  }

  return _target;
}


class CategoryItem extends React.Component {
    constructor(props) {
        super(props)
        this.imageLoad = this.imageLoad.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)
        
    }

    toggleFavorite(e) {

        let item = this.props.item;

        if(this.props.favoriteStatus) {
            this.props.removeFavorite(item);
            this.props.alertOpen('取关成功！')
            
        }else {
            this.props.addFavorite(item);
            this.props.alertOpen('关注成功！')
        }

        e.stopPropagation();
    }

    imageLoad(e) {
        e.target.className = styles.imgFadeIn;
        return false
    }

    render() {

        const filterSwitch = this.props.filterSwitch;
        const item = this.props.item;
        const styleType = getClassType(this.props.type);

        const notShow = (!filterSwitch || !this.props.filter || this.props.filter == item.platform ) ? '' : 'notShow';
        
        const overflow = typeof this.props.overflow !== 'undefined' ? this.props.overflow : true;
        const online = this.props.online == true ? true : false;
        const onlineClass = online ? 'online' : '';

        return (
            <section 
                onClick={() => {
                    this.props.addItem(item)
                    browserHistory.push('/live')
                }} 
                className={classnames(styles[styleType], styles[notShow], styles[onlineClass])}
            >
                
                {/*<PlayAdd className={styles.add} />*/}
                <section className={styles.imgWrapper}>
                    {
                        this.props.type == 'search'
                            ? item.anchor.substr(0, 1)
                            : <LazyLoad
                                overflow={overflow}
                                resize={true}
                                throttle={200}
                                height={`auto`}
                            >
                                <figure>
                                    <img src={`${item.cover}`} onLoad={this.imageLoad} />
                                </figure>
                            </LazyLoad>
                    }
                </section>
                <section className={styles.textSec}>
                    <div className={styles.title} title={`${item.title}`}>
                        {item.title}
                    </div>
                    <div className={styles.ico}>
                        <span><ActionEye /> {item.view}</span>
                        <span><ActionEye /> {item.anchor}</span>
                        <span onClick={this.toggleFavorite} className={styles.like}>{this.props.favoriteStatus ? <FavoriteIco /> : <FavoriteBroIco style={{opacity: '.3'}} />}</span>
                    </div>
                </section>
                <div className={styles.onlineTarget}></div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    filter: state.categorys.filter,
    favorite: state.favorite.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (item) => dispatch(screenItemsAdd(item)),
  layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
  alertOpen: (clas) => dispatch(alertOpen(clas)),
  removeFavorite: (item) => dispatch(removeFavorite(item)),
  addFavorite: (item) => dispatch(addFavorite(item)),
})



export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)