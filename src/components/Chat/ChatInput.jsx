import React from 'react';
import { connect } from 'react-redux';
import Emoji from 'components/Emoji';
import ShareScreen from 'components/ShareScreen';
import styles from './ChatInput.css';

class ChatInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  sendMessage() {
    // const msg = this.refs.chatTextarea.value;

    if (!this.context.socket || this.context.socket.status !== 'connected') {
      console.warn('Socket is unavailable!');
      return;
    }

    if (this.refs.chatTextarea.value.length <= 0) {
      console.warn('Can not send empty!');
      return;
    }

    const message = {
      content: this.refs.chatTextarea.value,
      color: localStorage.getItem('__barrage_name_color'),
      nickname: `${this.props.data.user ? this.props.data.user.nickname : '弹幕大神'}`,
      mmr: this.props.mmr,
    };

    this.context.socket.emit('message:send', message);
    this.refs.chatTextarea.value = '';
  }

  handleKeyEvent(event) {
    const e = event || window.event;
    if (e.ctrlKey) {
      if (e.keyCode === 13) {
        const value = this.refs.chatTextarea.value;

        if (value && value.length > 0) {
          this.refs.chatTextarea.value += '\r\n';
        } else {
          this.refs.chatTextarea.value = '\r\n';
        }
      }
    } else if (e.keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  render() {
    return (
      <section className={styles.chatInput}>
        <textarea
          ref="chatTextarea"
          placeholder="发送消息"
          onKeyDown={this.handleKeyEvent}
        />
        <Emoji nickname={this.props.nickname} mmr={this.props.mmr} />
        <ShareScreen nickname={this.props.nickname} mmr={this.props.mmr} />
      </section>
    );
  }
}

ChatInput.contextTypes = {
  socket: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.metadata.data,
});

export default connect(mapStateToProps)(ChatInput);
