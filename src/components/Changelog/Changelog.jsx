import React from 'react';
import {browserHistory, Redirect } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './Changelog.css';

export default (props) => {
    return (
        <Dialog
            modal={false}
            open={props.open}
            bodyClassName={styles.outerClass}
            overlayClassName={styles.overlayClass}
            className={styles.dialogClass}
            contentClassName={styles.contentClass}
            autoScrollBodyContent={true}
        >
            <section className={styles.changeLogSec}>
                <h4>版本更新<span>version 1.0.0</span></h4>
                <img src={require('../../../assets/changelog.jpg')} alt=""/>
                <h2>
                    RUARUA.live测试版发布!
                </h2>
                <ul>
                    <li>部分地区<strong>twitch</strong>和<strong>afreecate</strong>视频可能无法播放(国外源)</li>
                    <li>部分网站屏蔽分享源(如国内的panda.tv),现阶段不在聚合范围</li>
                    <li>内容刷新频率为1min,一分钟之内同类目下内容不会更新,一分钟之后内容是否更新取决于源是否更新</li>
                    <li>不同平台播放器质量参差不齐,部分会使<strong>CPU高荷</strong>造成页面卡顿(比如douyu.tv)</li>
                    <li>内容爬取不一定稳定，可能出现类目请求无内容返回情况</li>
                    <li>注册登录,Steam登录应该没问题, Steam登录之后发送弹幕会<strong>显示Dota2天梯分数</strong></li>
                    <li>一大堆BUG.. <strong>#NeedYOU!</strong></li>
                </ul>
                <div style={{
                    textAlign: 'center'
                }}>
                    <FlatButton
                        label="进入"
                        backgroundColor="#43b581"
                        hoverColor="#2e9465"
                        style={{
                            width: '120px', 
                            margin: '30px auto 0'
                        }}
                        onClick={() => browserHistory.push('/category/all')}
                    />
                </div>
                <p className={styles.copyRight}>站点所有资源均来自互联网聚合, 如有任何疑问请联系 <span>675483520@qq.com</span></p>
            </section>
        </Dialog>
    )
}