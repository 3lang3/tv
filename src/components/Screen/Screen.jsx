import React from 'react';
import { connect } from 'react-redux';
import ScreenItem from 'components/ScreenItem';
import { getScreenItems } from 'actions';
import styles from './Screen.css';


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

class screen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const urlParams = this.props.location.query.rooms;
    const screenItems = this.props.screenItems.data;
    const screen = screenItems.length;

    if (!screen && urlParams && urlParams.length > 0) {
      this.props.getScreenItems(urlParams);
    }
  }

  render() {
    const items = [];
    const screenItems = this.props.screenItems.data;
    const screen = screenItems.length;

    !!screen && screenItems.forEach((item) => {
      items.push(<ScreenItem key={`${item.roomId}${item}`} favoriteStatus={isFavorite(item, this.props.favorite)} screenCount={screen} item={item} />);
    });

    return (
      <section className={styles.stageMain}>

        {
                    items.length > 0
                    ? items
                    : '没有观看的内容'
                }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  screenItems: state.screenItems,
  favorite: state.favorite.data,
});

const mapDispatchToProps = dispatch => ({
  getScreenItems: par => dispatch(getScreenItems(par)),
});


export default connect(mapStateToProps, mapDispatchToProps)(screen);
