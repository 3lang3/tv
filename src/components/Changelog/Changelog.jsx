import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Redirect } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './Changelog.css';

class ChangeLog extends React.Component {

    render() {
        const needShowChangeLog = localStorage.getItem('needShowChangeLog');
        const version = this.props.metadata.version;
        let open = false;

        if ( version !== undefined && (needShowChangeLog !== version || needShowChangeLog === null)) {
            localStorage.setItem('needShowChangeLog', version);
            open = true;
        }

        return (
            <Dialog
                modal={false}
                open={open}
                bodyClassName={styles.outerClass}
                overlayClassName={styles.overlayClass}
                className={styles.dialogClass}
                contentClassName={styles.contentClass}
                autoScrollBodyContent={true}
            >
                <section className={styles.changeLogSec}>
                    <h4>版本更新<span>version 1.1.0</span></h4>
                    <img src={require('../../../assets/changelog.jpg')} alt="" />
                    <h2>
                        更新内容
                    </h2>
                    <ul>
                        <li>添加搜索功能(针对roomTitle和roomAnchor的检索)</li>
                        <li>添加观看分享功能(将当前观看房间发送至聊天, 其余用户点击相应分享可直接观看)</li>
                        <li>添加类目平台分类功能</li>
                        <li>优化视频显示比例</li>
                        <li>优化图片按需加载</li>
                        <li>依然一大堆BUG.. <strong>#NeedYOU!</strong></li>
                    </ul>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <FlatButton
                            label="进入"
                            backgroundColor="#43b581"
                            hoverColor="#2e9465"
                            style={{
                                width: '120px',
                                margin: '30px auto 0',
                                color: '#fff',
                            }}
                            onClick={() => browserHistory.push('/category/all')}
                        />
                    </div>
                    <p className={styles.copyRight}>站点所有资源均来自互联网聚合, 如有任何疑问请联系 <span>675483520@qq.com</span></p>
                </section>
            </Dialog>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata.data,
})


export default connect(mapStateToProps)(ChangeLog);