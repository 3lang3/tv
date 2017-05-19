import React from 'react';
import styles from './Barrage.css';
import EmojiItem from 'components/Emoji/EmojiItem.jsx'

export default (props) => {
    const namecolor = props.color || '#fff';

    const asi = props.type == 'emoji' ? props.content.split('+') : null;
    const barrage = () => {
        switch (props.type) {
            case 'emoji':
                return (
                    <EmojiItem xais={asi[0]} yais={asi[1]} />
                )
            default:
                return props.content
        }
    }

    return (
        <li>
            {props.mmr ? <span className={styles.playerMmr}>{props.mmr}</span> : ''}
            <span 
                className={styles.playerName} 
                style={{color: namecolor}}
            >{props.nickname || '弹幕大神'}: </span>
            { barrage() }
        </li>
    )
}