import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CategoryItem from 'components/CategoryItem';
import ScreenItem from 'components/ScreenItem';
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

const bannerItemsHander = (data) => {
    let results = [];

    for(let key in data) {
            
        let items = data[key];

        if(results.length < 5) results.push(items[0])

    }
    console.log(results)
    return results;
}

class Recommend extends React.Component {

    constructor(props) {
        super(props)

        this.moreCategory = this.moreCategory.bind(this)
    }

    componentDidMount() {
        console.log('Update')
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
        let bannerItems = bannerItemsHander(data);

        for(let key in data) {
            
            let items = data[key];
            itemsHtml.push(<h2 key={key}>{key}<span className={styles.text}>热门主播</span> <span onClick={ () => {this.moreCategory(key)}} className={styles.more}>more</span></h2>)

            items && items.forEach((item, key) => {
                itemsHtml.push(<CategoryItem favoriteStatus={(isFavorite(item, favoriteList))} filterSwitch={false} key={`${item.roomId}${key}`} item={item} type="category" />)
            })

        }

        return (
            <div className={styles.container}>
                <Scrollbars className={styles.scroll}>
                    {bannerItems.length > 0 
                        ? <div className={styles.banner}>
                        <section className={styles.info}>
                            <h4>【震中杯】OG vs Liquid （小组赛BO3）</h4>
                            <p>
                                EPICENTER 震中杯决赛阶段将于6月4日至6月11日在俄罗
                                斯莫斯科开战。由直邀加地区预选组成的10只世界顶尖强
                                队将在本比赛中角逐，争夺50万美元总奖金以及冠军荣誉。
                                群雄逐鹿，谁主沉浮，精彩赛事尽在火猫直播。
                            </p>
                        </section>
                        <section className={styles.player}>
                            <ScreenItem item={bannerItems[0]} screenCount={1} />
                        </section>
                        <section className={styles.list}>
                            <section className={styles.item}><img src={bannerItems[0].cover} alt=""/></section>
                            <section className={styles.item}><img src={bannerItems[1].cover} alt=""/></section>
                            <section className={styles.item}><img src={bannerItems[2].cover} alt=""/></section>
                            <section className={styles.item}><img src={bannerItems[3].cover} alt=""/></section>
                            <section className={styles.item}><img src={bannerItems[4].cover} alt=""/></section>
                        </section>
                    </div>
                    : ''
                    }
                    <div className={styles.content}>
                        {itemsHtml}
                    </div>
                </Scrollbars>
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
    getCategorys: (name) => dispatch(getCategorys(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);