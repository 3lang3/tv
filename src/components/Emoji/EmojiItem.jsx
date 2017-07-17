import React from 'react';
import classnames from 'classnames';
import styles from './EmojiItem.css';

export default (props) => {
  const clickEvent = props.e ? props.e : null;
  const barrageClass = !clickEvent ? 'barrage' : '';

  return (
    <section
      onClick={clickEvent}
      className={classnames(styles.emojiItem, styles[barrageClass])}
      style={{ backgroundPosition: `${props.xais} ${props.yais}` }}
    />
  );
};
