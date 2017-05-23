import React from 'react';
import { connect } from 'react-redux';

import styles from './ScreenItem.css';
import classnames from 'classnames';
import { 
  IconUser,
  IconGame
} from '../Icons';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import IconClear from 'material-ui/svg-icons/content/clear';

import {screenItemsRemove} from 'actions';

const platforms = [
    {name: 'douyu', url: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id='},
    {name: 'huomao', url: 'https://www.huomao.com/outplayer/index/'},
    {name: 'twitch', url: 'https://player.twitch.tv/?channel='},
    {name: 'afreecatv', url: 'http://www.afreecatv.com/player/player.html?isAfreeca=false&type=station&autoPlay=true&szPart=NORMAL'},
    {name: 'douyuvideo', url: 'https://v.douyu.com/video/share/index?vid='},
    {name: 'huya', url: 'http://liveshare.huya.com/'},
]

const preFixIds = (item) => {
    let ids = item.roomId;
    let _id;

    if(typeof ids != 'object') {
        
        _id = ids;
        if(item.platform == 'huya') _id = `${ids}//huyacoop.swf`;

    }else {
        for (let key in ids) {
            _id+= `&${key}=${ids[key]}`
        }
    }
    
    return _id;
}

const preScreenCount = (count) => {

    switch (count) {
        case 1:
            return 'oneScreen';
        case 2:
            return 'twoScreen';
        case 3:
            return 'threeScreen';
        default:
            return '';
    }
    
}
// 
class screenItem extends React.Component {

    render() {
        const item = this.props.item;
        const id = preFixIds(this.props.item);
        const paddBottom = (item.platform == 'douyu' || item.platform == 'huya' || item.platform == 'douyuvideo') ? 640/360 : 1.77777777778
        const secHeight = this.props.screenCount > 1 ? 49 : 98;
        const screenClass = preScreenCount(this.props.screenCount);

        let _url;
        
        platforms.map(platform => {
            if(platform.name == item.platform) return _url = platform.url;
        })

        return (
            <section className={classnames(styles.stageItem, styles[screenClass])} style={{paddingBottom: `${secHeight/paddBottom}%`}}>
                <section className={styles.itemIframe} 
                     dangerouslySetInnerHTML={{__html: `<embed allowscriptaccess="always" src="${_url}${id}" allowfullscreen="true"></embed>`}}>
                </section>
                <section className={styles.itemInfo}>
                    {/*<p onClick={() => item.removeItem(item)}>{item.title}</p>*/}
                    <ul>
                        <li>
                            <span><IconClear onClick={() => this.props.removeItem(item) } /></span>
                        </li>
                        {/*<li>
                            <span><IconGame /> {item.type}</span>
                        </li>
                        <li>
                            <span><IconUser /> {item.anchor}</span>
                        </li>
                        <li>
                            <span><ActionEye /> {item.view}</span>
                        </li>*/}
                    </ul>
                </section>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeItem: (item) => dispatch(screenItemsRemove(item)),
})


export default connect(null, mapDispatchToProps)(screenItem)