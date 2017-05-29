import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import styles from './CategoryItem.css';
import classnames from 'classnames';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import PlayAdd from 'material-ui/svg-icons/av/playlist-add';
import FavoriteBroIco from 'material-ui/svg-icons/action/favorite-border';
import FavoriteIco from 'material-ui/svg-icons/action/favorite';

import {screensActive, screenItemsAdd, screenItemsRemove, layoutsOpen, alertOpen} from 'actions';

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

class CategoryItem extends React.Component {
    constructor(props) {
        super(props)
        this.imageLoad = this.imageLoad.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)

        this.state = {
            favorite: this.props.favorite
        }
    }

    toggleFavorite(e) {

        let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
        let item = this.props.item;

        if(this.state.favorite) {
            let newfavoriteList = favoriteList.filter(_item => _item.anchor != item.anchor || _item.roomId != item.roomId );

            localStorage.setItem('favoriteList', JSON.stringify(newfavoriteList));
            this.props.alertOpen('取关成功！')
            
        }else {
            favoriteList.push(item);
            localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
            this.props.alertOpen('关注成功！')
        }

        this.setState({
            favorite: !this.state.favorite,
        })

        e.stopPropagation();
    }

    imageLoad(e) {
        e.target.className = styles.imgFadeIn;
        return false
    }

    render() {

        const item = this.props.item;
        const notShow = (!this.props.filter || this.props.filter == item.platform) ? '' : 'notShow';
        const styleType = getClassType(this.props.type);
        const overflow = typeof this.props.overflow !== 'undefined' ? this.props.overflow : true;

        return (
            <section 
                onClick={() => {
                    this.props.addItem(item)
                    this.props.layoutsOpen(false)
                }} 
                className={classnames(styles[styleType], styles[notShow])}
            >
                
                {/*<PlayAdd className={styles.add} />*/}
                <section className={styles.imgWrapper}>
                    <LazyLoad
                        overflow={overflow}
                        resize={true}
                        height={158}
                        throttle={200}
                    >
                        <img src={`${item.cover}`} onLoad={this.imageLoad} />
                    </LazyLoad>
                </section>
                <section className={styles.textSec}>
                    <div className={styles.title} title={`${item.title}`}>
                        {item.title}
                    </div>
                    <div className={styles.ico}>
                        <span><ActionEye /> {item.view}</span>
                        <span><ActionEye /> {item.anchor}</span>
                        <span onClick={this.toggleFavorite} className={styles.like}>{this.state.favorite ? <FavoriteIco /> : <FavoriteBroIco />}</span>
                    </div>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    filter: state.categorys.filter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (item) => dispatch(screenItemsAdd(item)),
  layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
  alertOpen: (clas) => dispatch(alertOpen(clas)),
})



export default connect(null, mapDispatchToProps)(CategoryItem)