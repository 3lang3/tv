import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { alertOpen } from 'actions';

import config from '../../../config';
import styles from './Register.css';

const API_HOST = `${config.ENDHOST}`;

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: !window.location.href.includes('register'),
    };
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const registerMsg = window.location.href.includes('register')
                ? '注册失败 | 邮箱已被占用啦.'
                : '登录失败 | 账号或者密码有问题哦.';

    window.location.href.includes('false') && this.props.alertOpen({ message: registerMsg, duration: 10000 });
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  submit() {
    const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    const form = document.querySelector('#formRegLogin');
    const emailIpt = document.querySelector('input[name="email"]');
    const passwordIpt = document.querySelector('input[name="password"]');
    const nickenameIpt = document.querySelector('input[name="nickname"]');

    if (this.state.toggle) {
      if (!regEmail.test(emailIpt.value) || (passwordIpt.value.length < 5)) {
        return this.props.alertOpen('1.邮箱可能不正确啊; 2.密码最少6位哦');
      }
    } else if (!regEmail.test(emailIpt.value) || (passwordIpt.value.length < 5) || nickenameIpt.value.length < 3) {
      return this.props.alertOpen('1.邮箱可能不正确啊; 2.密码最少6位哦; 3.昵称也是要填的啦！');
    }
    return form.submit();
  }

  render() {
    const open = this.props.open;
    const isLogin = this.state.toggle;
    const textRegLogin = isLogin ? '登录' : '注册';
    const toggleClass = isLogin ? 'loginBg' : 'regBg';
    const jumpTextRegLogin = isLogin ? '去注册' : '去登录';

    return (
      <Dialog
        modal={false}
        open={open}
        bodyClassName={styles.outerClass}
        contentClassName={styles.contentClass}
        onRequestClose={this.props.handleClose}
        overlayClassName={styles.overlayClass}
      >
        <div className={styles.registerSec}>
          <div className={classnames(styles.imageSec, styles[toggleClass])} />
          <div className={styles.inputSec}>
            <div>
              <h4>{ textRegLogin }<span>RUARUA.live</span></h4>
              <form id="formRegLogin" action={isLogin ? `${API_HOST}/login` : `${API_HOST}/register`} method="get">
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
                                        ? <Checkbox
                                          label="接受RUARUA.live用户协议"
                                          name="xy"
                                          checked
                                          className={styles.checkbox}
                                        />
                                        : ''
                                }

              </form>
            </div>
            <div className={styles.btnGroup}>
              <FlatButton
                label={textRegLogin}
                backgroundColor="#6f4ab1"
                hoverColor="#6f4bb1"
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
              <p className={styles.underSec}><a href={`${API_HOST}/loginSteam`}>使用Steam账号登录</a></p>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertOpen: message => dispatch(alertOpen(message)),
});

export default connect(null, mapDispatchToProps)(Register);
