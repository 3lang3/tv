import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Screen.css';
import ScreenItem from 'components/ScreenItem';

import {screenItemsAdd, screenItemsRemove, layoutsOpen} from 'actions';

class screen extends React.Component {

    constructor(props) {
        super(props)
    }
    
    componentWillUpdate(props, nextProps) {
        if(props.items.length == 0 && !props.layouts.open) {
            props.layoutsOpen(true)
        }
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
                        <img src={require('../../../assets/status_img_6_black.png')} alt=""/>
                        <p>Rua, 赶快从左侧列表挑选主播吧！</p>
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