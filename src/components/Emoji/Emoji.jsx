import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from 'classnames';
import EmojiItem from './EmojiItem';
import styles from './Emoji.css';

class Emoji extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  toggleOpen() {
    return this.setState({ isOpen: !this.state.isOpen });
  }

  sendMessage(ais) {
    if (!this.context.socket || this.context.socket.status !== 'connected') {
      console.warn('Socket is unavailable!');
      return;
    }

    const message = {
      content: ais,
      color: localStorage.getItem('__barrage_name_color'),
      nickname: `${this.props.data.user ? this.props.data.user.nickname : '弹幕大神'}`,
      mmr: this.props.mmr,
    };

    this.context.socket.emit('message:send:emoji', message);
  }

  render() {
    const activeClass = this.state.isOpen ? 'open' : '';
    const x = 42;
    const y = 31;
    const items = [];
    let count = 0;

    for (let yais = 0; yais < y; yais++) {
      for (let xais = 0; xais < x; xais++) {
        count++;
        items.push(
          <section className={styles.emojiBox} key={count}>
            <EmojiItem
              e={(e) => {
                this.sendMessage(`${e.target.style.backgroundPositionX}+${e.target.style.backgroundPositionY}`);
                this.toggleOpen();
              }}
              xais={`-${xais * 22}px`} yais={`-${yais * 22}px`}
            />
          </section>,
                );
      }
    }

    return (
      <div className={styles.emoji}>
        <div onClick={() => this.toggleOpen()} className={styles.style} />

        <Scrollbars ref="emojiContainer" className={classnames(styles.emojiScroll, styles[activeClass])}>
          <section className={styles.emojiContent}>
            {items}
          </section>
        </Scrollbars>
      </div>
    );
  }
}

Emoji.contextTypes = {
  socket: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.metadata.data,
});

export default connect(mapStateToProps)(Emoji);
