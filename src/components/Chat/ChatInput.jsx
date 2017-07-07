import React from 'react';
import {connect } from 'react-redux';
import styles from './ChatInput.css';
import { emojiToggle } from 'actions';
import Emoji from 'components/Emoji';
import ShareScreen from 'components/ShareScreen';

class ChatInput extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
    }

    sendMessage() {
        var msg = this.refs.chatTextarea.value;

        if (!this.context.socket || this.context.socket.status !== 'connected') {
            console.warn('Socket is unavailable!');
            return;
        }

        if (this.refs.chatTextarea.value.length <= 0) {
            console.warn('Can not send empty!');
            return;
        }

        var message = {
            content: this.refs.chatTextarea.value,
            color: localStorage.getItem('__barrage_name_color'),
            nickname: `${this.props.data.user ? this.props.data.user.nickname : '弹幕大神'}`,
            mmr: this.props.mmr,
        };

        this.context.socket.emit('message:send', message);
        this.refs.chatTextarea.value = ''
    }

    handleKeyEvent(event) {
        var e = event || window.event;
        if (e.ctrlKey) {
            if (e.keyCode === 13) {
                var value = this.refs.chatTextarea.value;

                if (value && value.length > 0) {
                    this.refs.chatTextarea.value += '\r\n';
                } else {
                    this.refs.chatTextarea.value = '\r\n';
                }
            }
        } else {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.sendMessage();
            }
        }
    }

    render() {

        return (
            <section className={styles.chatInput}>
                <textarea
                    ref="chatTextarea" 
                    placeholder="发送消息"
                    onKeyDown={this.handleKeyEvent}
                >
                </textarea>
                <Emoji nickname={this.props.nickname} mmr={this.props.mmr} />
                <ShareScreen nickname={this.props.nickname} mmr={this.props.mmr} />
            </section>
        )
    }
}

ChatInput.contextTypes = {
    socket: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: state.metadata.data
})

export default connect(mapStateToProps)(ChatInput)