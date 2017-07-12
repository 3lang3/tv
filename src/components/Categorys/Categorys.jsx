import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import styles from './Categorys.css';
import CategoryItem from 'components/CategoryItem';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconZoom, IconMini } from 'components/Icons';
import { forceCheck } from 'react-lazyload';

import { Scrollbars } from 'react-custom-scrollbars';
import IconButton from 'material-ui/IconButton';
import CloseIco from 'material-ui/svg-icons/navigation/close';

import {getCategorys, filterCategorys} from 'actions';

const getData = (props) => {
  props.getCategorys(props.params.name);
}


const preTypeTitle = (props) => {

  let _title;

  !!props.category.data.length && props.category.data.forEach((el, index) => {
    if(el.name == props.params.name) return _title = <h2><span>{el.name_cn}</span>{el.name_en}</h2>
  })

  return _title;
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

class Categorys extends React.Component {
  constructor(props) {
    super(props)
    this.filterHander = this.filterHander.bind(this)
  }

  filterHander(clas) {
    this.props.filterCategorys(clas)
  }

  componentDidMount() {
    getData(this.props)
  }

  componentDidUpdate() {
    forceCheck()
  }

  render() {
    // const typeName = preTypeTitle(this.props);
    const typeName = preTypeTitle(this.props) ;
    const loading = this.props.data.loading;
    const isError = this.props.data.error;
    const items = this.props.data.data;
    const filterName = this.props.data.filter;

    let itemsHtml = [];
    let itemsPlatform = [''];
    let favoriteList = this.props.favorite;

    if(items instanceof Array) {
      items.forEach((item, key) => {
        if(itemsPlatform.indexOf(item.platform) == -1 ) itemsPlatform.push(item.platform);

        itemsHtml.push(<CategoryItem favoriteStatus={(isFavorite(item, favoriteList))} filterSwitch={true} key={`${item.roomId}${key}`} item={item} type="category" />)
      })
    }

    for (let k = 0; k < 10; k++) {
        itemsHtml.push(<div key={`empty${k}`} className={styles.categoryEmpty}></div>)
    }
    
    return (
      <div className={classnames(styles.tv)}>

        <div className={styles.categoryTitle}>
            {typeName}
            <section className={styles.chipSec}>
              {
                itemsPlatform.length > 1 && itemsPlatform.map((platform, key) => {
                  return <span className={ filterName == platform ? styles.active : '' } onClick={() => this.filterHander(platform)} key={key}>{platform || 'All'}</span>
                })
              }
            </section>
        </div>
        
        
          <section className={styles.flexWrapper}>
            {loading ? <div className={styles.loader}><Spinner size={50} /></div> : ''}
            {isError ? <Error img={require('../../../assets/error_fetch.svg')} content='Ooops,服务器好像出了点小问题' /> : itemsHtml }
          </section>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    data: state.categorys,
    category: state.category,
    filter: state.categorys.filter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  filterCategorys: (clas) => dispatch(filterCategorys(clas)),
  getCategorys: (clas) => dispatch(getCategorys(clas)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categorys)