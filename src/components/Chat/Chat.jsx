import React from 'react';
import { connect } from 'react-redux';
import { Socket, Event } from 'react-socket-io';
import classnames from 'classnames';
import Barrage from 'components/Barrage';
import ChatInput from 'components/Chat/ChatInput.jsx';
import ChatSetting from 'components/Chat/ChatSetting.jsx';
import config from '../../../config';

const API_HOST = `${config.ChatHOST}`;

import styles from './Chat.css';

const Chat = (props) => {
  const toggleClass = props.chatToggle ? '' : 'chatClose';

  return (

    <Socket
      uri={API_HOST}
    >
      <div className={classnames(styles.chat, styles[toggleClass])}>
        <Barrage />
        <ChatSetting />
        <ChatInput />
      </div>
    </Socket>
  );
};

const mapStateToProps = (state, ownProps) => ({
  chatToggle: state.layouts.chat,
  data: state.metadata.data,
});

export default connect(mapStateToProps)(Chat);
