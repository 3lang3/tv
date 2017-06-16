import React from 'react';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner';
import Search from 'components/Search';
import styles from './Header.css';
import { 
  IconNotice,
  IconChatBubbleClose,
  IconFdj,
  IconProfile,
  IconChatBubble
} from '../Icons';
import FlatButton from 'material-ui/FlatButton';
import ToggleIco from 'material-ui/svg-icons/communication/clear-all';

import { layoutsChat, layoutsOpen } from 'actions';
import Register from 'components/Register';
import Profile from 'components/Profile';
import Favorite from 'components/Favorite';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

        this.state = {
            open: window.location.href.includes('false') ? true : false,
        };
    }
    
    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {

        const RegisterDialogStatus = this.state.open;

        
        const {loading: loading, error: isError, done: isDone, data: userInfo } = this.props.metadata;
        const isLogin = userInfo.status ? true : false;
        const user = userInfo.user;
        const afterLoginProfile = isLogin 
                                    ? <div onTouchTap={this.handleOpen} className={styles.profileBtn}>
                                        <img src={user.avatar || require('../../../assets/avatar.png')} />
                                        <div className={styles.text}>
                                            <h5>{user.nickname}</h5>
                                            <span><i></i> 观看 Grimmmz 直播 PLAYERUNKNOWN'S BATTLEGROUNDS</span>
                                        </div> 
                                    </div>
                                    : <FlatButton
                                            onTouchTap={this.handleOpen}
                                            className={styles.btn}
                                        > 
                                            登录
                                        </FlatButton> ;
        const afterLoginProfileDialog = isLogin 
                                    ? <Profile data={user} open={RegisterDialogStatus} handleClose={this.handleClose} />
                                    : <Register open={RegisterDialogStatus}  handleClose={this.handleClose} />;

        return (
            <section className={styles.header}>
                    { loading ? <Spinner color="#fff" size={22} /> : afterLoginProfile }
                { afterLoginProfileDialog }
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    metadata: state.metadata,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)