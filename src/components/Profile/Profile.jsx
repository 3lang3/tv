import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import EmailIco from 'material-ui/svg-icons/communication/email';
import GiftIco from 'material-ui/svg-icons/action/card-giftcard';
import { browserHistory } from 'react-router';
import config from '../../../config';
import styles from './Profile.css';

const API_HOST = `${config.ENDHOST}`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const open = this.props.open;
    const data = this.props.data;
    const steamInfo = data.steamInfo ? data.steamInfo : null;
    const avatar = data.avatar ? data.avatar : require('../../../assets/avatar.png');

    const actions = [
      <FlatButton
        label="返回"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="修改"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        modal={false}
        open={open}
        onRequestClose={this.props.handleClose}
        bodyClassName={styles.outerClass}
        contentClassName={styles.contentClass}
        overlayClassName={styles.overlayClass}
      >
        <div className={styles.profileSec}>
          <div className={styles.imageSec}>
            <img src={avatar} />
            <h4>{data.nickname}</h4>
            <h5>{data.email ? data.email : <FlatButton
              label="绑定邮箱"
              icon={<EmailIco />}
              className={styles.emailBtn}
            />}
            </h5>
          </div>
          <div className={styles.listSec}>
            <p>用户编号: 000001</p>
            <p>积分: 15000 <IconButton
              className={styles.dhBtn}
              tooltip="兑换礼品"
            >
              <GiftIco />
            </IconButton>
            </p>
            {/* {steamInfo
                                ? <div>
                                    <p>SteamID: {steamInfo.profile.steamid}</p>
                                    <p>单排分: {steamInfo.solo_competitive_rank}</p>
                                    <p>组排分: {steamInfo.competitive_rank}</p>
                                </div>
                                : <FlatButton
                                        label="绑定Steam, 激活更多网站内容!"
                                        className={styles.bdBtn}
                                        backgroundColor="#a4c639"
                                        hoverColor="#8AA62F"
                                        icon={<IconSteam />}
                                        onClick={() => window.location.href = `${API_HOST}/loginSteam`}
                                    />
                            }*/}
            <br />
            <FlatButton
              label="退出登录"
              className={styles.logoutBtn}
              backgroundColor="#f8882d"
              hoverColor="#f0ad4e"
              onClick={() => window.location.href = `${API_HOST}/logout`}
            />
          </div>

        </div>
      </Dialog>
    );
  }
}

export default Profile;
