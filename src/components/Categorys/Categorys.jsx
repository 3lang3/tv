import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from 'classnames';
import CategoryItem from 'components/CategoryItem';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import PageLoader from 'components/PageLoader';
import { forceCheck } from 'react-lazyload';
import { getCategorys, getCategorysMore } from 'actions';
import styles from './Categorys.css';

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
    this.page = 0;
    this.platform = 'all';
    this.word = props.params.name;
    this.scrollEvent = this.scrollEvent.bind(this);
  }


  componentDidMount() {
    this.props.getCategorys(this.platform, this.word);
  }

  componentDidUpdate() {
    forceCheck();
  }

  filterEvent({ platform, word }) {
    this.page = 0;
    if (platform) this.platform = platform;
    if (word) this.word = word;
    this.props.getCategorys(this.platform, this.word);
  }

  scrollEvent(value) {
    if (value.top == 1) {
      this.page++;
      this.props.getCategorysMore(this.platform, this.word, this.page);
    }
  }

  render() {
    const typeName = <h2><span>{this.props.params.name}</span></h2>;
    const { loading, error, data, done, pageLoading } = this.props.data;

    const categoryPlatformList = [];
    const itemsHtml = [];
    const itemsPlatform = [''];
    const favoriteList = this.props.favorite;

    this.props.category.done && this.props.category.platforms.forEach((item, key) => {
      categoryPlatformList.push(<span key={item} className={this.platform == item ? styles.active : ''} onClick={() => this.filterEvent({ platform: item })}>{item}</span>)
    })

    if (data instanceof Array) {
      data.forEach((item, key) => {
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
            <span className={this.platform == 'all' ? styles.active : ''} onClick={() => this.filterEvent({ platform: 'all' })}>所有平台</span>
            {categoryPlatformList}
          </section>
        </div>

        <Scrollbars
          className="ScrollContainer"
          onScrollFrame={ pageLoading ? this.scrollEvent : () => null }
        >
          {loading ? <div className={styles.loader}><Spinner size={50} /></div> : ''}
          {error ? <Error img={require('../../../assets/error_fetch.svg')} content="Ooops,服务器好像出了点小问题" /> : itemsHtml}
          {pageLoading ? PageLoader() : ''}
        </Scrollbars>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.categorys,
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  getCategorys: (platform, word, page) => dispatch(getCategorys(platform, word, page)),
  getCategorysMore: (platform, word, page) => dispatch(getCategorysMore(platform, word, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categorys);
