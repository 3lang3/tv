import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import styles from './Live.css';
import { IconLogo, IconName } from '../Icons';

const User = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <IconLogo width="168px" height="168px" />
          </div>
          <div className={styles.name}>
            <IconName fill="rgb(114, 137, 218)" />
          </div>
        </div>
        <div className={styles.invite}>
          <div>
            <h2>来自 <span>RUARUA.live</span> 的内测邀请</h2>
            <dl>
              <dt>您将拥有以下权限：</dt>
              <dd>匿名livechat</dd>
              <dd>同时间观看多个直播间</dd>
              <dd>有偿(dota2 饰品)BUG反馈</dd>
            </dl>

            <FlatButton
              label="接受邀请"
              backgroundColor="#5d7ce6"
              hoverColor="#4e6dd7"
              style={{
                width: '100%',
                height: '50px',
                lineHeight: '50px',
                marginTop: '30px',
              }}
              onClick={() => browserHistory.push('/')}
            />
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

export default User;
