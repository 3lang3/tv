import React from 'react';
import fetch from 'isomorphic-fetch';
import styles from './Register.css';

import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { alertOpen } from 'actions';

const convertFormdataToJson = (formData) => {
    let objData = {};
    formData.forEach((value, key) => objData[key] = value);
    
    return JSON.stringify(objData);
}

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: true,
        }
        this.submit = this.submit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle,
        })
    }

    submit(e) {
        const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        const form = document.querySelector('#formRegLogin');
        const emailIpt = document.querySelector('input[name="email"]');
        const passwordIpt = document.querySelector('input[name="password"]');
        const nickenameIpt = document.querySelector('input[name="nickname"]');

        if(this.state.toggle) {
            if(!regEmail.test(emailIpt.value) || (passwordIpt.value.length < 5)) {
                return this.props.alertOpen('1.邮箱可能不正确啊; 2.密码最少6位哦')
            }
        }else {
            if(!regEmail.test(emailIpt.value) || (passwordIpt.value.length < 5 || passwordIpt.value.indexOf(' ') > -1) || nickenameIpt.value.length > 3 ) {
                return this.props.alertOpen('1.邮箱可能不正确啊; 2.密码最少6位哦; 3.昵称也是要填的啦！')
            }
        }
        return form.submit()
    }

    render() {
        const open = this.props.open;
        const isLogin = this.state.toggle;
        const textRegLogin = isLogin ? '登录' : '注册';
        const toggleClass = isLogin ? 'loginBg' : 'regBg';
        const jumpTextRegLogin = isLogin ? `去注册` : `去登录`;

        return (
            <Dialog
                modal={false}
                open={open}
                bodyClassName={styles.outerClass}
                contentClassName={styles.contentClass}
                onRequestClose={this.props.handleClose}
                >
                <div className={styles.registerSec}>
                    <div className={classnames(styles.imageSec, styles[toggleClass])}></div>
                    <div className={styles.inputSec}>
                        <div>
                        <h4>{ textRegLogin }<span>RUARUA.live</span></h4>
                            <form id="formRegLogin" action={isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register'} method="get">
                                {
                                    !isLogin
                                        ? <TextField
                                                hintText=""
                                                floatingLabelText="昵称"
                                                name="nickname"
                                            />
                                        : ''
                                }
                                <br />
                                <TextField
                                    hintText=""
                                    floatingLabelText="邮箱"
                                    type="email"
                                    name="email"
                                /><br />
                                <TextField
                                    hintText=""
                                    floatingLabelText="密码"
                                    type="password"
                                    name="password"
                                /><br />
                                {
                                    !isLogin
                                        ?   <Checkbox
                                                label="接受RUARUA.live用户协议"
                                                name="xy"
                                                checked={true}
                                                className={styles.checkbox}
                                            />
                                        : ''
                                }

                            </form>
                        </div>
                        <div className={styles.btnGroup}>
                            <FlatButton
                                label={ textRegLogin }
                                backgroundColor="#5d7ce6"
                                hoverColor="#4e6dd7"
                                style={{
                                    color: '#fff',
                                }}
                                onClick={this.submit}
                            />

                            <FlatButton
                                label={jumpTextRegLogin}
                                onClick={this.toggle}
                                style={{
                                    color: '#999',
                                    marginLeft: '10px',
                                }}
                            />
                            <p className={styles.underSec}><a href="http://localhost:3000/loginSteam">使用Steam账号登录</a></p>
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    alertOpen: (message) => dispatch(alertOpen(message)),
})

export default connect(null, mapDispatchToProps)(Register);