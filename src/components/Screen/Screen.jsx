import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Screen.css';
import ScreenItem from 'components/ScreenItem';
import { BgSolarStystem } from 'components/Background';
import Recommend from 'components/Recommend';

import {screenItemsAdd, screenItemsRemove, layoutsChat} from 'actions';

class screen extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.layoutsChat(true)
    }

    componentWillUnmount() {
        this.props.layoutsChat(false)
    }
    
    render() {
        const items = [];
        const screen = this.props.items.length;
        this.props.items.forEach((item, key) => {
            items.push(<ScreenItem key={`${item.roomId}${item}`} screenCount={screen} item={item} />)
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
    items: state.screenItems,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    layoutsChat: (clas) => dispatch(layoutsChat(clas)),
})


export default connect(mapStateToProps, mapDispatchToProps)(screen)