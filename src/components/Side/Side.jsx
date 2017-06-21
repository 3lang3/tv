import React from 'react';
import styles from './Side.css';
import {IconLogo, IconGithub} from '../Icons';
import IconBug from 'material-ui/svg-icons/action/bug-report';
import IconCopyright from 'material-ui/svg-icons/action/copyright';

import Favorite from 'components/Favorite';
import Header from 'components/Header';

export default () => (
    <div className={styles.container}>
        <div className={styles.logo}>
            <h1><IconLogo /></h1>
            <h2>全球直播聚合平台</h2>
            <p>网罗全球热门主播于一身，支持一屏多看，喜欢的主播全在RUARUA这里!<br />本站为开源站点，渴望你的支持！</p>
            <div className={styles.icon}>
                <a data-tip="Github" href="https://github.com/EthanOrange/tv" target="_blank"><IconGithub /></a>
                <a data-tip="Bug反馈" href="https://github.com/EthanOrange/tv/issues/new" target="_blank"><IconBug className={styles.size} /></a>
                <IconCopyright data-tip="本站内容均为各大平台采集获得，若出现违规内容请及时通过意见反馈告知，谢谢监督" className={styles.size} />
            </div>
        </div>
        <div className={styles.layout}>
            <div className={styles.layoutInner}>
                <Favorite />
            </div>
        </div>
        <Header />
    </div>
)