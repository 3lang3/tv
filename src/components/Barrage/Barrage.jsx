import React from 'react';
import { connect } from 'react-redux';
import { Socket, Event } from 'react-socket-io';
import { Scrollbars } from 'react-custom-scrollbars';
import BarrageItem from './BarrageItem';
import Error from 'components/Error';

import styles from './Barrage.css';

const barrageSplit = (barrages, barrage) => {
  let newBarrage = barrages.concat();

  if(newBarrage.length > 100) {
    newBarrage.shift()
  }

  newBarrage.push(barrage)

  return newBarrage;
}

class Barrage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onMessage = this.onMessage.bind(this);
    this.connectError = this.connectError.bind(this);
    this.connectSuccess = this.connectSuccess.bind(this);
    this.state = {
      barrages: [],
      online: false,
    }
  }

  onMessage(message) {

      this.setState({
        barrages: barrageSplit(this.state.barrages, message),
      })

    this.refs.barrageScroll.scrollToBottom();
  }
  
  connectError() {
    this.setState({
      online: false,
    })
  }

  connectSuccess() {
    this.setState({
      online: true,
    })
  }

  render() {
    const isOnline = this.state.online;
    let barragesHtml = [];
    const nickname = this.props.data ? this.props.data.nickname : null,
          mmr = this.props.data.steamInfo ? this.props.data.steamInfo.solo_competitive_rank : null;

    this.state.barrages.forEach((barrage, key) => {
      barragesHtml.push(<BarrageItem key={key} nickname={nickname} mmr={mmr} {...barrage} />)
    })
    
    return (
      <Scrollbars ref="barrageScroll" className={styles.scrollBox}>
        {
          isOnline
            ? <ol className={styles.chats}>
                  {barragesHtml}
              </ol>
            : <Error img={require('../../../assets/chat_status.svg')} content="正在连接弹幕服务器..." />
        }
          
          
          <Event event='message:receive' handler={this.onMessage} />
          <Event event='connect_error' handler={this.connectError} />
          <Event event='reconnecting' handler={this.connectError} />
          <Event event='reconnect_error' handler={this.connectError} />
          <Event event='connect' handler={this.connectSuccess} />
      </Scrollbars>
    )
  }
}

Barrage.contextTypes = {
    socket: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: state.metadata.data
})

export default connect(mapStateToProps)(Barrage)