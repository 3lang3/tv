import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import styles from './CategoryItem.css';
import classnames from 'classnames';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import PlayAdd from 'material-ui/svg-icons/av/playlist-add';

import {screensActive, screenItemsAdd, screenItemsRemove, layoutsOpen} from 'actions';


class CategoryItem extends React.Component {
    constructor(props) {
        super(props)
        this.imageLoad = this.imageLoad.bind(this)
    }

    imageLoad(e) {
        e.target.className = styles.imgFadeIn;
        return false
    }

    render() {
        const item = this.props.item;
        const notShow = (!this.props.filter || this.props.filter == item.platform) ? '' : 'notShow';

        return (
            <section 
                onClick={() => {
                    this.props.addItem(item)
                    this.props.layoutsOpen(false)
                }} 
                className={classnames(styles.tvItem, styles[notShow])}
            >
                
                <PlayAdd className={styles.add} />
                <LazyLoad
                    overflow={true}
                    resize={true}
                    height={158}
                    throttle={200}
                >
                    <img src={`${item.cover}`} onLoad={this.imageLoad} />
                </LazyLoad>
                <section>
                    <div className={styles.title} title={`${item.title}`}>
                        {item.title}
                    </div>
                    <div className={styles.ico}>
                        <span><ActionEye /> {item.view}</span>
                        <span><ActionEye /> {item.anchor}</span>
                    </div>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    filter: state.categorys.filter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (item) => dispatch(screenItemsAdd(item)),
  layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})



export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)