import React from 'react';
import styles from './Side.css';
import {IconLogo, IconGithub} from '../Icons';

import Favorite from 'components/Favorite';
import Header from 'components/Header';

export default () => (
    <div className={styles.container}>
        <div className={styles.logo}>
            <h1><IconLogo /></h1>
            <h2>全球视频聚合平台</h2>
            <p>聚集全球热门主播于一身，一个ruarua全搞定，支持一屏多看，喜欢的主播都不放过!本站为零收益的开源站点，渴望你的支持！</p>
            <div className={styles.icon}>
                <IconGithub />
            </div>
        </div>
        <Favorite />
        <Header />
    </div>
)