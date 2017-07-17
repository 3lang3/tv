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


const smallTitleHandler = (props) => {
  let result;

  props.category.data.forEach((el) => {
    if (props.item.type === el.name) result = `${el.name_cn} | ${el.name_en}`;
  });

  return result;
};

const platforms = [
    { name: 'douyu', url: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id=' },
    { name: 'huomao', url: 'https://www.huomao.com/outplayer/index/' },
    { name: 'twitch', url: 'https://player.twitch.tv/?channel=' },
    { name: 'afreecatv', url: 'http://www.afreecatv.com/player/player.html?isAfreeca=false&type=station&autoPlay=true&szPart=NORMAL' },
    { name: 'douyuvideo', url: 'https://v.douyu.com/video/share/index?vid=' },
    { name: 'huya', url: 'http://liveshare.huya.com/' },
    { name: 'quanmin', url: 'http://quanmin.tv/static/v2/boot/embed/embed.html?isindex=2&roomid=' },
    { name: 'bilibili', url: 'https://static.hdslb.com/live-static/swf/LivePlayerEx_1.swf?cid=' },
    { name: 'longzhu', url: 'http://player.plures.net/prod/player/vPlayer_v162.swf?&env=cn&vxml=http://player.plures.net/prod/player/videoConfig/video_homev6.xml&roomId=' },
];

const preFixIds = (item) => {
  const ids = item.roomId;
  let id;

  if (typeof ids !== 'object') {
    id = ids;
    if (item.platform === 'huya') _id = `${ids}//huyacoop.swf`;
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
    const smallTitleText = smallTitleHandler(this.props);
    const favoriteHtml = this.props.favoriteStatus ? <span className={styles.like}><FavoriteIco /></span> : <span><FavoriteBroIco /></span>;

    let url;

    platforms.map((platform) => {
      if (platform.name === item.platform) return url = platform.url;
    });

    return (
      <section className={classnames(styles.stageItem, styles[screenClass])}>
        <section className={styles.brand}>
          <div className={styles.typeImg}>
            <img src={`${config.ENDHOST}/images/${item.type}.jpg`} />
          </div>
          <div className={styles.title}>
            <h3>{item.title}</h3>
            <h5><Link to={`/categorys/${item.type}`}><span><IconGame /> {smallTitleText} </span><span><IconUser />{item.anchor}</span> <span><ActionEye /> {item.view}</span> </Link></h5>
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
          dangerouslySetInnerHTML={{ __html: `<iframe allowscriptaccess="always" src="${url}${id}" allowfullscreen="true"></iframe>` }}
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
