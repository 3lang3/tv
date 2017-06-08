import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import CategoryItem from 'components/CategoryItem';
import Banner from 'components/Banner';
import Spinner from 'components/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { forceCheck } from 'react-lazyload';

import styles from './Recommend.css';

import { getRecommend, getCategorys } from 'actions';

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

class Recommend extends React.Component {

    constructor(props) {
        super(props)

        this.moreCategory = this.moreCategory.bind(this)
    }

    componentDidMount() {
        this.props.getRecommend();
    }

    componentDidUpdate() {
        forceCheck()
    }

    moreCategory(clas) {

        browserHistory.push(`/category/${clas}`)
        this.props.getCategorys(clas)
    }

    render() {

        const {loading: loading, error: error, done: done, data: data } = this.props.recommend;
        let itemsHtml = [];
        let favoriteList = this.props.favorite;

        for(let key in data) {
            
            let items = data[key];
            itemsHtml.push(<h2 key={key}>{key}<span className={styles.text}>热门主播</span> <span onClick={ () => {this.moreCategory(key)}} className={styles.more}>more</span></h2>)

            items && items.forEach((item, key) => {
                itemsHtml.push(<CategoryItem favoriteStatus={(isFavorite(item, favoriteList))} filterSwitch={false} key={`${item.roomId}${key}`} item={item} type="category" />)
            })

        }

        return (
            <div className={styles.container}>
                { !loading &&  done
                    ? <div className={styles.outerWrapper}>
                        <Scrollbars className={styles.scroll}>
                            <Banner />
                            <div className={styles.content}>
                                {itemsHtml}
                            </div>
                        </Scrollbars>
                    </div>
                    : <div className={styles.empty}><Spinner color="#fff" /></div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    recommend: state.recommend,
    favorite: state.favorite.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRecommend: () => dispatch(getRecommend()),
    getCategorys: (name) => dispatch(getCategorys(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);