import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import CategoryItem from 'components/CategoryItem';
import Spinner from 'components/Spinner';
import PageLoader from 'components/PageLoader';
import { getRecommend, getRecommendMore } from 'actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from './Hot.css';

class Hot extends React.Component {

  constructor(props) {
    super(props);
    this.page = 0;
    this.platform = 'all';
    this.word = 'all';
    this.scrollEvent = this.scrollEvent.bind(this);
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentDidMount() {
    this.props.getRecommend();
  }

  moreCategory(clas) {
    browserHistory.push(`/categorys/${clas}`);
  }

  scrollEvent(value) {
    if(value.top == 1) {
      this.page++;
      this.props.getRecommendMore(this.platform, this.word, this.page);
    }
  }

  filterEvent({platform, word}) {
    this.page = 0;
    if(platform) this.platform = platform;
    if(word) this.word = word;
    this.props.getRecommend(this.platform, this.word);
  }

  render() {

    const { loading, pageLoading, error, done, data } = this.props.recommend;
    let categoryGameList = [];
    let categoryPlatformList = [];
    let itemsHtml = [];

    this.props.category.done && this.props.category.data.forEach((item, key) => {
      if(key > 12) return false;
      categoryGameList.push(<span key={item.type} className={ this.word == item.type ? styles.active : ''} onClick={() => this.filterEvent({word: item.type})}>{item.type}</span>)
    })

    this.props.category.done && this.props.category.platforms.forEach((item, key) => {
      categoryPlatformList.push(<span key={item} className={ this.platform == item ? styles.active : ''} onClick={() => this.filterEvent({platform: item})}>{item}</span>)
    })

    data.length > 0 && data.forEach((item, key) => {
      itemsHtml.push(<CategoryItem filterSwitch={false} key={item._id} item={item} type="category" />);
    });

    return (
      <div className={styles.container}>
        <div className={styles.outerWrapper}>
          <div className={styles.content}>
            <div>
              <h2>全部直播</h2>
              <section className={styles.chipSec}>
                <span className={ this.platform == 'all' ? styles.active : ''} onClick={() => this.filterEvent({platform: 'all'})}>所有平台</span>
                {categoryPlatformList}
              </section>
              <section className={styles.chipSec}>
                <span className={ this.word == 'all' ? styles.active : ''} onClick={() => this.filterEvent({word: 'all'})}>所有游戏</span>
                {categoryGameList}
              </section>
            </div>
            { !loading && done
            ?<Scrollbars onScrollFrame={pageLoading ? this.scrollEvent : () => null } className="ScrollContainer">
              {itemsHtml}
              {pageLoading ? PageLoader() : ''}
            </Scrollbars>
            : <div className={styles.loader}><Spinner /></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recommend: state.recommend,
  category: state.category,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRecommend: (platform, word) => dispatch(getRecommend(platform, word)),
  getRecommendMore: (platform, word, page) => dispatch(getRecommendMore(platform, word, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hot);
