import React from 'react';
import styles from './Barrage.css';
import EmojiItem from 'components/Emoji/EmojiItem.jsx';
import CategoryItem from 'components/CategoryItem';

const getBarrage = (props) => {
    switch (props.type) {
        case 'emoji':
        const asi = props.content.split('+') ;
            return (
                <EmojiItem xais={asi[0]} yais={asi[1]} />
            )
        
        case 'screen':
            let items = [];

            JSON.parse(props.content).forEach((item, key) => {
                items.push(<CategoryItem key={key} type="screen" item={item} />)
            })

            return <div className={styles.share}>{ items }</div>;

        default:
            return props.content
    }
}

export default (props) => {
    const namecolor = props.color || '#fff';
    const barrage = getBarrage(props);
    const typeText =  props.type == 'screen' ? '正在看' : '';

    return (
        <li>
            {props.mmr ? <span className={styles.playerMmr}>{props.mmr}</span> : ''}
            <span 
                className={styles.playerName} 
                style={{color: namecolor}}
            >{props.nickname || '弹幕大神'}{typeText}: </span>
            { barrage }
        </li>
    )
}