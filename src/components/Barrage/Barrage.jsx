import React from 'react';
import { connect } from 'react-redux';
import { Event } from 'react-socket-io';
import { Scrollbars } from 'react-custom-scrollbars';
import Error from 'components/Error';
import BarrageItem from './BarrageItem';
import styles from './Barrage.css';

const barrageSplit = (barrages, barrage) => {
  const newBarrage = barrages.concat();

  if (newBarrage.length > 100) {
    newBarrage.shift();
  }

  newBarrage.push(barrage);

  return newBarrage;
};

class Barrage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onMessage = this.onMessage.bind(this);
    this.onMessageLogin = this.onMessageLogin.bind(this);
    this.connectError = this.connectError.bind(this);
    this.connectSuccess = this.connectSuccess.bind(this);
    this.state = {
      barrages: [],
      online: false,
    };
  }

  componentWillUpdate() {
    this.refs.barrageScroll.scrollToBottom();
  }

  onMessage(message) {
    this.setState({
      barrages: barrageSplit(this.state.barrages, message),
    });

    this.refs.barrageScroll.scrollToBottom();
  }

  onMessageLogin(message) {
    this.setState({
      barrages: barrageSplit(this.state.barrages, message),
    });
  }

  connectError() {
    this.setState({
      online: false,
    });
  }

  connectSuccess() {
    this.context.socket.emit('login', {
      nickname: `${this.props.data.user ? this.props.data.user.nickname : '弹幕大神'}`,
      color: localStorage.getItem('__barrage_name_color'),
    });

    this.setState({
      online: true,
    });
  }

  render() {
    const isOnline = this.state.online;
    const barragesHtml = [];

    this.state.barrages.forEach((barrage, key) => {
      barragesHtml.push(<BarrageItem key={key} {...barrage} />);
    });

    return (
      <Scrollbars ref="barrageScroll" className={styles.scrollBox}>
        {
          isOnline
            ? <ol className={styles.chats}>
              {barragesHtml}
            </ol>
            : <Error img={require('../../../assets/chat_status.svg')} content="正在连接弹幕服务器..." />
        }


        <Event event="message:receive" handler={this.onMessage} />
        <Event event="message:login" handler={this.onMessageLogin} />
        <Event event="message:logout" handler={this.onMessageLogin} />
        <Event event="connect_error" handler={this.connectError} />
        <Event event="reconnecting" handler={this.connectError} />
        <Event event="reconnect_error" handler={this.connectError} />
        <Event event="connect" handler={this.connectSuccess} />
      </Scrollbars>
    );
  }
}

Barrage.contextTypes = {
  socket: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.metadata.data,
});

export default connect(mapStateToProps)(Barrage);
