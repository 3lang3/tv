import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import CategoryItem from 'components/CategoryItem';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { forceCheck } from 'react-lazyload';
import { getCategorys, filterCategorys } from 'actions';
import styles from './Categorys.css';

const getData = (props) => {
  props.getCategorys(props.params.name);
};

const preTypeTitle = (props) => {
  let title;

  !!props.category.data.length && props.category.data.forEach((el) => {
    if (el.name === props.params.name) return title = <h2><span>{el.name_cn}</span>{el.name_en}</h2>;
  });

  return title;
};

const isFavorite = (item, favoriteList) => {
  let target = false;

  if (favoriteList instanceof Array) {
    favoriteList.forEach((list) => {
      if (item.roomId === list.roomId && item.anchor === list.anchor) {
        target = true;
      }
    });
  } else {
    target = false;
  }

  return target;
};

class Categorys extends React.Component {
  constructor(props) {
    super(props);
    this.filterHander = this.filterHander.bind(this);
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate() {
    forceCheck();
  }

  filterHander(clas) {
    this.props.filterCategorys(clas);
  }

  render() {
    // const typeName = preTypeTitle(this.props);
    const typeName = preTypeTitle(this.props);
    const loading = this.props.data.loading;
    const isError = this.props.data.error;
    const items = this.props.data.data;
    const filterName = this.props.data.filter;

    const itemsHtml = [];
    const itemsPlatform = [''];
    const favoriteList = this.props.favorite;

    if (items instanceof Array) {
      items.forEach((item, key) => {
        if (itemsPlatform.indexOf(item.platform) === -1) itemsPlatform.push(item.platform);

        itemsHtml.push(<CategoryItem favoriteStatus={(isFavorite(item, favoriteList))} filterSwitch key={`${item.roomId}${key}`} item={item} type="category" />);
      });
    }

    for (let k = 0; k < 10; k++) {
      itemsHtml.push(<div key={`empty${k}`} className={styles.categoryEmpty} />);
    }

    return (
      <div className={classnames(styles.tv)}>

        <div className={styles.categoryTitle}>
          {typeName}
          <section className={styles.chipSec}>
            {
                itemsPlatform.length > 1 && itemsPlatform.map((platform, key) => <span className={filterName == platform ? styles.active : ''} onClick={() => this.filterHander(platform)} key={key}>{platform || 'All'}</span>)
              }
          </section>
        </div>


        <section className={styles.flexWrapper}>
          {loading ? <div className={styles.loader}><Spinner size={50} /></div> : ''}
          {isError ? <Error img={require('../../../assets/error_fetch.svg')} content="Ooops,服务器好像出了点小问题" /> : itemsHtml }
        </section>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.categorys,
  category: state.category,
  filter: state.categorys.filter,
});

const mapDispatchToProps = dispatch => ({
  filterCategorys: clas => dispatch(filterCategorys(clas)),
  getCategorys: clas => dispatch(getCategorys(clas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categorys);
