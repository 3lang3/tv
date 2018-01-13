import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import classnames from 'classnames';

import ActionEye from 'material-ui/svg-icons/action/visibility';
import IconClear from 'material-ui/svg-icons/content/clear';

import FavoriteBroIco from 'material-ui/svg-icons/action/favorite-border';
import FavoriteIco from 'material-ui/svg-icons/action/favorite';
import { screenItemsRemove, addFavorite, removeFavorite } from 'actions';

import {
  IconUser,
  IconGame,
} from '../Icons';
import config from '../../../config';
import styles from './ScreenItem.css';

const platforms = [
    { name: 'douyu', url: 'http://staticlive.douyucdn.cn/common/share/play.swf?room_id=', attr: 'type="application/x-shockwave-flash" allowscriptaccess="always" allownetworking="all" wmode="window" allowfullscreen="true" allowFullScreenInteractive="true"' },
    { name: 'huomao', url: 'https://www.huomao.com/outplayer/index/', attr: '' },
    { name: 'twitch', url: 'https://player.twitch.tv/?channel=' },
    { name: 'afreecatv', url: 'http://www.afreecatv.com/player/player.html?isAfreeca=false&type=station&autoPlay=true&szPart=NORMAL' },
    { name: 'douyuvideo', url: 'http://v.douyu.com/video/share/index?vid=' },
    { name: 'huya', url: 'http://liveshare.huya.com/', attr: 'type="application/x-shockwave-flash" allowscriptaccess="always"' },
    { name: 'zhanqi', url: 'http://www.zhanqi.tv/live/embed?roomId=', attr: '' },
    { name: 'quanmin', url: 'http://quanmin.tv/static/v2/boot/embed/embed.html?roomid=',  attr: 'type="application/x-shockwave-flash" allowscriptaccess="always"' },
    { name: 'bilibili', url: 'http://static.hdslb.com/live-static/swf/LivePlayerEx_1.swf?cid=', attr: 'type="application/x-shockwave-flash" allowscriptaccess="always"' },
    { name: 'longzhu', url: 'http://player.plures.net/prod/player/vPlayer_v162.swf?&env=cn&vxml=http://player.plures.net/prod/player/videoConfig/video_homev6.xml&roomId=', attr: 'type="application/x-shockwave-flash" allowscriptaccess="always"' },
];

const preFixIds = (item) => {
  const ids = item.roomId;
  let id;

  if (typeof ids !== 'object') {
    id = ids;
    if (item.platform === 'huya') id = `${ids}//huyacoop.swf`;
  } else {
    for (const key in ids) {
      id += `&${key}=${ids[key]}`;
    }
  }

  return id;
};

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
};
//
class screenItem extends React.Component {

  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    const item = this.props.item;

    if (this.props.favoriteStatus) {
      this.props.removeFavorite(item);
    } else {
      this.props.addFavorite(item);
    }
  }

  render() {
    const item = this.props.item;
    const id = preFixIds(this.props.item);
    const paddBottom = (item.platform === 'douyu' || item.platform === 'huya' || item.platform === 'douyuvideo') ? 16 / 9 : 16 / 9;
    const secHeight = this.props.screenCount > 1 ? 100 : 100;
    const screenClass = preScreenCount(this.props.screenCount);
    const favoriteHtml = this.props.favoriteStatus ? <span className={styles.like}><FavoriteIco /></span> : <span><FavoriteBroIco /></span>;

    let url;
    let attr;
    let name;
    let player;

    platforms.map(platform => {
      if (platform.name === item.platform) {
        url = platform.url;
        attr = platform.attr;
        name = platform.name;
        player = name == 'huomao' ? `<iframe ${attr} src="${url}${id}"></iframe>` : `<embed ${attr} src="${url}${id}"></embed>`
        return
      }
    });

    return (
      <section className={classnames(styles.stageItem, styles[screenClass])}>
        <section className={styles.brand}>
          {/* <div className={styles.typeImg}>
            <img src={`${config.ENDHOST}/images/${item.type}.jpg`} />
          </div> */}
          <div className={styles.title}>
            <h3>{item.title}</h3>
            <h5><Link to={`/categorys/${item.type}`}><span><IconGame /> {item.type} </span><span><IconUser />{item.anchor}</span> <span><ActionEye /> {item.view}</span> </Link></h5>
          </div>
          <section className={styles.itemInfo}>
            <ul>
              <li onClick={() => this.props.removeItem(item)} >
                <span><IconClear /></span>
              </li>
              <li data-tip="取消关注" onClick={this.toggleFavorite}>
                {favoriteHtml}
              </li>
            </ul>
          </section>
        </section>
        <section
          style={{ paddingBottom: `${secHeight / paddBottom}%` }} className={styles.itemIframe}
          dangerouslySetInnerHTML={{ __html: player }}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch(screenItemsRemove(item)),
  removeFavorite: item => dispatch(removeFavorite(item)),
  addFavorite: item => dispatch(addFavorite(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(screenItem);
