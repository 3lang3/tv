import React from 'react';
import { connect } from 'react-redux';

import styles from './CategoryItem.css';

import ActionEye from 'material-ui/svg-icons/action/visibility';
import PlayAdd from 'material-ui/svg-icons/av/playlist-add';

import {screensActive, screenItemsAdd, screenItemsRemove} from 'actions';

class categoryItem extends React.Component {

    render() {
        const item = this.props.item;

        return (
            <section onClick={() => this.props.addItem(item)} className={styles.tvItem}>
                <PlayAdd className={styles.add} />
                <img src={`${item.cover}`} />
                <div className={styles.title} title={`${item.title}`}>
                    {item.title}
                </div>
                <div className={styles.ico}>
                    <span><ActionEye /> {item.view}</span>
                    <span><ActionEye /> {item.anchor}</span>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (item) => dispatch(screenItemsAdd(item))
})

export default connect(null, mapDispatchToProps)(categoryItem)