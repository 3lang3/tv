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
import IconButton from 'material-ui/IconButton';
import ToggleIco from 'material-ui/svg-icons/communication/clear-all';

import { layoutsChat, layoutsOpen } from 'actions';
import Register from 'components/Register';
import Profile from 'components/Profile';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            open: false,
        };
    }
    
    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };
    // 
    render() {
        const RegisterDialogStatus = this.state.open;
        const isChat = this.props.layout.chat;
        const isOpen = this.props.layout.open;
        
        const {loading: loading, error: isError, done: isDone, data: userInfo } = this.props.data;
        const isLogin = userInfo.status ? true : false;
        const user = userInfo.user;
        const afterLoginProfile = isLogin 
                                    ? <img style={{width: '30px'}} src={user.avatar || require('../../../assets/avatar.png')} /> 
                                    : <IconProfile />;
        const afterLoginProfileDialog = isLogin 
                                    ? <Profile data={user} open={RegisterDialogStatus} handleClose={this.handleClose} />
                                    : <Register open={RegisterDialogStatus} handleClose={this.handleClose} />;

        return (
            <section className={styles.header}>
                {
                    !isOpen ? <IconButton
                                className={styles.toggleBtn}
                                tooltip="显示列表"
                                onClick={() => this.props.layoutsOpen(true) }
                              >
                                <ToggleIco />
                            </IconButton>
                           : <div></div>
                }
                <Search width="50%" />
                <nav>
                    {/*<IconButton
                        onClick={this.props.layoutsChat}
                    >
                        {isChat ? <IconChatBubble /> : <IconChatBubbleClose /> }
                    </IconButton>*/}
                    <IconButton>
                        <IconNotice />
                    </IconButton>
                    
                    <IconButton onTouchTap={this.handleOpen}> 
                        { loading ? <Spinner color="#fff" size={22} /> : afterLoginProfile }
                    </IconButton> 
                </nav>
                { afterLoginProfileDialog }
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    data: state.metadata,
    layout: state.layouts,
})

const mapDispatchToProps = (dispatch) => ({
    layoutsChat: () => dispatch(layoutsChat()),
    layoutsOpen: (clas) => dispatch(layoutsOpen(clas)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)