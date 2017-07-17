import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CategoryItem from 'components/CategoryItem';
import Spinner from 'components/Spinner';
import { getRecommend } from 'actions';
import styles from './Hot.css';

class Hot extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRecommend();
  }

  moreCategory(clas) {
    browserHistory.push(`/categorys/${clas}`);
  }

  render() {
    const { loading, error, done, data } = this.props.recommend;
    const itemsHtml = [];

    for (const key in data) {
      const items = data[key];
      itemsHtml.push(<h2 key={key}>{key}<span className={styles.text}>热门主播</span> <span onClick={() => this.moreCategory(key)} className={styles.more}>more</span></h2>);

      items && items.forEach((item, key) => {
        itemsHtml.push(<CategoryItem filterSwitch={false} key={`${item.roomId}${key}`} item={item} type="category" />);
      });

      for (let k = 0; k < 10; k++) {
        itemsHtml.push(<div key={`empt${key}${k}`} className={styles.itemWrapper} />);
      }
    }

    return (
      <div className={styles.container}>
        { !loading && done
                    ? <div className={styles.outerWrapper}>
                      <div className={styles.content}>
                        {itemsHtml}
                      </div>
                    </div>
                    : <div className={styles.loader}><Spinner /></div>
                }

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recommend: state.recommend,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRecommend: () => dispatch(getRecommend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hot);
