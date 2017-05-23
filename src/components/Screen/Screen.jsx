import React from 'react';
import { connect } from 'react-redux';

import styles from './Screen.css';
import ScreenItem from 'components/ScreenItem';

import {screenItemsAdd, screenItemsRemove, layoutsOpen} from 'actions';

class screen extends React.Component {

    constructor(props) {
        super(props)
    }
    
    componentWillUpdate(props, nextProps) {
        if(props.items.length == 0) {
            props.layoutsOpen(true)
        }
    }

    render() {
        const items = [];
        const screen = this.props.items.length;
        
        this.props.items.forEach((item, key) => {
            items.push(<ScreenItem key={item.roomId} screenCount={screen} item={item} />)
        })
        
        return (
            <section className={styles.stageMain}>
                {
                    items.length > 0 
                    ? items 
                    : <section className={styles.emptyScreen}>
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
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})


export default connect(mapStateToProps, mapDispatchToProps)(screen)