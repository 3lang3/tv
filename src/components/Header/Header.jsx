import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/Spinner';
import FlatButton from 'material-ui/FlatButton';
import Register from 'components/Register';
import Profile from 'components/Profile';
import styles from './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      open: !!window.location.href.includes('false'),
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const RegisterDialogStatus = this.state.open;
    const { loading, error: isError, done: isDone, data: userInfo } = this.props.metadata;
    const isLogin = !!userInfo.status;
    const user = userInfo.user;
    const afterLoginProfile = isLogin
                                    ? (<div onTouchTap={this.handleOpen} className={styles.profileProfile}>
                                      <img src={user.avatar || require('../../../assets/avatar.png')} />
                                      <div className={styles.text}>
                                        <h5>{user.nickname}</h5>
                                        <span><i /> { this.props.screenItems.length > 0 ? `观看 ${this.props.screenItems[0].anchor} 直播 ${this.props.screenItems[0].type}` : '空闲' }</span>
                                      </div>
                                    </div>)
                                    : (<div className={styles.profileLogin}>
                                      <FlatButton
                                        onTouchTap={this.handleOpen}
                                        className={styles.btn}
                                      >
                                            登录
                                        </FlatButton>
                                    </div>);
    const afterLoginProfileDialog = isLogin
                                    ? <Profile data={user} open={RegisterDialogStatus} handleClose={this.handleClose} />
                                    : <Register open={RegisterDialogStatus} handleClose={this.handleClose} />;

    return (
      <section className={styles.header}>
        { loading ? <Spinner color="#fff" size={22} /> : afterLoginProfile }
        { afterLoginProfileDialog }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  metadata: state.metadata,
  screenItems: state.screenItems.data,
});


export default connect(mapStateToProps)(Header);
