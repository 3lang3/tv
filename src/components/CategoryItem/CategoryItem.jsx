import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import LazyLoad from 'react-lazyload';
import styles from './CategoryItem.css';
import classnames from 'classnames';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import PlayAdd from 'material-ui/svg-icons/av/playlist-add';
import { IconUser, IconGame, } from '../Icons';

import {screenItemsAdd} from 'actions';

const typeHtmlHandler = (props) => {
    let item = props.item;

    switch(props.type) {
        case 'random':
            let _title = smallTitleHandler(props);

            return <section className={styles.textSec}>
                        <div className={styles.title} title={`${item.anchor}`}>
                            {item.anchor}
                        </div>
                        <div className={styles.ico}>
                            <span>{_title}</span>
                        </div>
                    </section>;;
        default:
            return <section className={styles.textSec}>
                        <div className={styles.title} title={`${item.title}`}>
                            {item.title}
                        </div>
                        <div className={styles.ico}>
                            <span><ActionEye /> {item.view}</span>
                            <span><IconUser /> {item.anchor}</span>
                        </div>
                    </section>;
    }
}

const smallTitleHandler = (props) => {
    let result;

    props.category.data.forEach((el, index) => {
        if(props.item.type == el.name ) result = `${el.name_cn} | ${el.name_en}`
    });

    return result;
}

const preUrlHandler = (items) => {
    let _preUrl = '?';

    if(!items.length) return '';

    items.forEach((el, index) => {
        _preUrl += `--${el.platform}+${JSON.stringify(el.roomId)}`;
    })

    return _preUrl;
}

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

        const filterSwitch = this.props.filterSwitch;
        const item = this.props.item;
        const styleType = this.props.type;

        const notShow = (!filterSwitch || !this.props.filter || this.props.filter == item.platform ) ? '' : 'notShow';

        const online = this.props.online == true ? true : false;
        const onlineClass = online ? 'online' : '';

        const typeHtml = typeHtmlHandler(this.props);

        return (
            <section 
                onClick={() => {
                    this.props.addItem(item)
                }} 
                className={classnames(styles[styleType], styles[notShow], styles[onlineClass])}
            >
                
                {/*<PlayAdd className={styles.add} />*/}
                <section className={styles.imgWrapper}>
                    {
                        this.props.type == 'search' || this.props.type == 'random'
                            ? item.anchor.substr(0, 1)
                            : <LazyLoad
                                overflow={true}
                                resize={true}
                                throttle={200}
                                height={`auto`}
                            >
                                <figure>
                                    <img src={`${item.cover}`} onLoad={this.imageLoad} />
                                </figure>
                            </LazyLoad>
                    }
                </section>
                {typeHtml}
                <div className={styles.onlineTarget}><span>离线</span></div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    filter: state.categorys.filter,
    category: state.category,
    screenItems: state.screenItems,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (item) => dispatch(screenItemsAdd(item)),
})



export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)