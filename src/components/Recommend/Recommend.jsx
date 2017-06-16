import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import CategoryItem from 'components/CategoryItem';
import Banner from 'components/Banner';
import Spinner from 'components/Spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { forceCheck } from 'react-lazyload';
import {getRecommend } from 'actions';

import styles from './Recommend.css';

class Recommend extends React.Component {

    constructor(props) {
        super(props)

        this.moreCategory = this.moreCategory.bind(this)
    }

    componentDidMount() {
        this.props.getRecommend();
    }

    moreCategory(clas) {
        browserHistory.push(`/categorys/${clas}`)
    }

    render() {

        const {loading: loading, error: error, done: done, data: data } = this.props.recommend;
        let itemsHtml = [];

        for(let key in data) {
            
            let items = data[key];
            itemsHtml.push(<h2 key={key}>{key}<span className={styles.text}>热门主播</span> <span onClick={() => this.moreCategory(key)} className={styles.more}>more</span></h2>)

            items && items.forEach((item, key) => {
                itemsHtml.push(<CategoryItem filterSwitch={false} key={`${item.roomId}${key}`} item={item} type="category" />)
            })

        }

        return (
            <div className={styles.container}>
                { !loading &&  done
                    ? <div className={styles.outerWrapper}>
                            <div className={styles.content}>
                                {itemsHtml}
                            </div>
                    </div>
                    : <div className={styles.empty}><Spinner /></div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    recommend: state.recommend,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRecommend: () => dispatch(getRecommend()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);