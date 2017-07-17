import React from 'react';
import { connect } from 'react-redux';
import CategoryItem from 'components/CategoryItem';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import Random from 'components/Random';
import { Scrollbars } from 'react-custom-scrollbars';
import { getOnline } from 'actions';
import styles from './Favorite.css';

const onlineFiter = (item, onlines) => {
  let target = false;

  onlines.forEach((online, index) => {
    if (online.anchor === item.anchor && online.roomId === item.roomId) target = true;
  });

  return target;
};

class Favorite extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const data = this.props.favorite;
    this.props.getOnline(data);
  }

  render() {
    const favoriteList = this.props.favorite;
    const onlineFavoriteList = this.props.online.data;
    const { loading, error, done } = this.props.online;
    const favoriteHtml = [];

    if (favoriteList instanceof Array) {
      favoriteList.forEach((item) => {
        const online = onlineFiter(item, onlineFavoriteList);
        if (online) {
          favoriteHtml.unshift(<CategoryItem favoriteStatus key={item.roomId} online={online} type="search" item={item} />);
        } else {
          favoriteHtml.push(<CategoryItem favoriteStatus key={item.roomId} online={online} type="search" item={item} />);
        }
      });
    }

    const html = favoriteHtml.length > 0
                ? favoriteHtml
                : (<div className={styles.noContent}>
                  <Error img={require('../../../assets/followed-channels__empty.png')} content="关注频道,轻松观看您喜爱的内容。 您可能会喜欢这些内容！" />
                </div>);

    return (
      <div className={styles.favorite}>
        <h4>正在关注</h4>
        <div className={styles.favoriteContent}>
          {loading ? <div style={{ marginTop: '40%' }}><Spinner color="#5b6ca9" size={30} /></div> : ''}
          <Scrollbars className={styles.scrollBox}>
            { done || error ? html : ''}
          </Scrollbars>
          <Random />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  online: state.online,
  favorite: state.favorite.data,
});

const mapDispatchToProps = dispatch => ({
  getOnline: data => dispatch(getOnline(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
