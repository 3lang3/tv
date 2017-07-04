import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Screen.css';
import ScreenItem from 'components/ScreenItem';
import {getScreenItems} from 'actions';


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

class screen extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const urlParams = this.props.location.query.rooms;
        const screenItems = this.props.screenItems.data;
        const screen =screenItems.length;

        if(!screen && urlParams && urlParams.length > 0) {
            this.props.getScreenItems(urlParams);
        }
    }

    render() {
        const items = [];
        const screenItems = this.props.screenItems.data;
        const screen =screenItems.length;

        !!screen && screenItems.forEach((item, key) => {
            items.push(<ScreenItem key={`${item.roomId}${item}`} favoriteStatus={isFavorite(item, this.props.favorite)} screenCount={screen} item={item} />)
        })
        
        return (
            <section className={styles.stageMain}>

                {
                    items.length > 0 
                    ? items 
                    : '没有观看的内容'
                }
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    screenItems: state.screenItems,
    favorite: state.favorite.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getScreenItems: (par) => dispatch(getScreenItems(par)),
})


export default connect(mapStateToProps, mapDispatchToProps)(screen)