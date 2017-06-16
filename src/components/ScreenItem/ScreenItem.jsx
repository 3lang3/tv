import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import styles from './ScreenItem.css';
import classnames from 'classnames';
import { 
  IconUser,
  IconGame
} from '../Icons';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import IconClear from 'material-ui/svg-icons/content/clear';

import {screenItemsRemove} from 'actions';

const smallTitleHandler = (props) => {
    let result;

    props.category.data.forEach((el, index) => {
        if(props.item.type == el.name ) result = `${el.name_cn} | ${el.name_en}`
    });

    return result;
}

const platforms = [
    {name: 'douyu', url: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id='},
    {name: 'huomao', url: 'https://www.huomao.com/outplayer/index/'},
    {name: 'twitch', url: 'https://player.twitch.tv/?channel='},
    {name: 'afreecatv', url: 'http://www.afreecatv.com/player/player.html?isAfreeca=false&type=station&autoPlay=true&szPart=NORMAL'},
    {name: 'douyuvideo', url: 'https://v.douyu.com/video/share/index?vid='},
    {name: 'huya', url: 'http://liveshare.huya.com/'},
    {name: 'quanmin', url: 'http://quanmin.tv/static/v2/boot/embed/embed.html?isindex=2&roomid='},
    {name: 'bilibili', url: 'https://static.hdslb.com/live-static/swf/LivePlayerEx_1.swf?cid='},
    {name: 'longzhu', url: 'http://player.plures.net/prod/player/vPlayer_v162.swf?&env=cn&vxml=http://player.plures.net/prod/player/videoConfig/video_homev6.xml&roomId='},
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
        const paddBottom = (item.platform == 'douyu' || item.platform == 'huya' || item.platform == 'douyuvideo') ? 16/9 : 16/9 
        const secHeight = this.props.screenCount > 1 ? 100 : 100;
        const screenClass = preScreenCount(this.props.screenCount);
        const smallTitleText = smallTitleHandler(this.props);

        let _url;
        
        platforms.map(platform => {
            if(platform.name == item.platform) return _url = platform.url;
        })

        return (
            <section className={classnames(styles.stageItem, styles[screenClass])}>
                <section className={styles.brand}>
                    <div className={styles.typeImg}>
                        <img src={`http://localhost:3000/images/${item.type}.jpg`} />
                    </div>
                    <div className={styles.title}>
                        <h3>{item.title}</h3>
                        <h5><Link to={`/categorys/${item.type}`}><IconGame /> {smallTitleText}</Link></h5>
                    </div>
                    <div className={styles.view}>
                        <span><IconUser />{item.anchor}</span> <span><ActionEye /> {item.view}</span>
                    </div>
                </section>
                <section style={{paddingBottom: `${secHeight/paddBottom}%`}} className={styles.itemIframe} 
                     dangerouslySetInnerHTML={{__html: `<embed allowscriptaccess="always" src="${_url}${id}" allowfullscreen="true"></embed>`}}>
                </section>
                <section className={styles.itemInfo}>
                    <ul>
                        <li>
                            <span><IconClear onClick={() => this.props.removeItem(item) } /></span>
                        </li>
                    </ul>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    category: state.category,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeItem: (item) => dispatch(screenItemsRemove(item)),
})


export default connect(mapStateToProps, mapDispatchToProps)(screenItem)