import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Screen.css';
import ScreenItem from 'components/ScreenItem';
import { BgSolarStystem } from 'components/Background';

import {screenItemsAdd, screenItemsRemove, layoutsOpen} from 'actions';

class screen extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        const items = [];
        const screen = this.props.items.length;
        const bgClass = this.props.layouts.open ? 'navOpenClass' : '';
        this.props.items.forEach((item, key) => {
            items.push(<ScreenItem key={item.roomId} screenCount={screen} item={item} />)
        })
        
        return (
            <section className={styles.stageMain}>
                {
                    items.length > 0 
                    ? items 
                    : <section className={classnames(styles.emptyScreen, styles[bgClass])}>
                        <p className={styles.text}>这么多平台这么多主播早已饥渴难耐啦！支持同时观看多个哦~</p>
                        <BgSolarStystem />
                    </section>
                }
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: state.screenItems,
    layouts: state.layouts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})


export default connect(mapStateToProps, mapDispatchToProps)(screen)