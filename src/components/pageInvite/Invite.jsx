import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import styles from './Invite.css';
import FlatButton from 'material-ui/FlatButton';
import { IconLogo, IconName } from '../Icons';
import {browserHistory, Redirect } from 'react-router';
import {getInvite} from 'actions';

class Invite extends Component {

    constructor(props) {
        super(props)
        this.passInvite = this.passInvite.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        
        this.state = {
            open: false,
        }
    }

    componentDidMount() {
        const code = this.props.location.query.code || null;
        this.props.getInvite(code)
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    passInvite() {
        localStorage.setItem('__inviteCode', this.props.location.query.code);
        let needShowChangeLog = localStorage.getItem('needShowChangeLog');
        console.log(needShowChangeLog)
        if(needShowChangeLog === true || needShowChangeLog === null) {
            console.log(needShowChangeLog)
            localStorage.setItem('needShowChangeLog', false);
            this.handleOpen();
        }else {
            return browserHistory.push('/category/all');
        }
    }

    render() {
        const isInvite = this.props.invite.status;
        
        return (
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
                            {
                                isInvite
                                    ?   <div>
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
                                                    marginTop: '30px'
                                                }}
                                                onClick={this.passInvite}
                                            />
                                        </div>
                                    : <div>错误的邀请码</div>
                            }
                        </div>
                    </div>
                    <Dialog
                        modal={false}
                        open={this.state.open}
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
                </div>
                
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    invite: state.invite.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getInvite: (code) => dispatch(getInvite(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Invite);