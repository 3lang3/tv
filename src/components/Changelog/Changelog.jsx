import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Redirect } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './Changelog.css';

class ChangeLog extends React.Component {

    constructor(props) {
        super(props)
        this.closeHandler = this.closeHandler.bind(this)
        this.state = {
            open: false,
        }
    }

    componentDidUpdate() {
        const needShowChangeLog = localStorage.getItem('needShowChangeLog');
        const version = this.props.metadata.version;

        if ( version !== undefined && (needShowChangeLog !== version || needShowChangeLog === null)) {
            localStorage.setItem('needShowChangeLog', version);
            this.closeHandler()
        }
    }

    closeHandler() {
        this.setState({
            open: true,
        })
    }

    render() {
        

        return (
            <Dialog
                modal={false}
                open={this.state.open}
                bodyClassName={styles.outerClass}
                overlayClassName={styles.overlayClass}
                className={styles.dialogClass}
                contentClassName={styles.contentClass}
                autoScrollBodyContent={true}
            >
                <section className={styles.changeLogSec}>
                    <h4>版本更新<span>version 2.0.0</span></h4>
                    <img src={require('../../../assets/changelog.jpg')}alt="" />
                    <h2>
                        更新内容
                    </h2>
                    <ul>
                        <li><strong>重要提示: Douyu直播播放器会造成某些浏览器直接卡死</strong></li>
                        <li>更改首页布局</li>
                        <li>重构主舞台空闲状态UI, 现改为hot和banner栏目</li>
                        <li>Chat模块从首页移除</li>
                        <li>添加Github开源地址,期待你的加入 <strong><a href="https://github.com/EthanOrange/tv" target="_blank">View Github</a></strong></li>
                        <li>依然一大堆BUG和ISSUE <strong>#NeedYOU</strong></li>
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
                            onClick={() => this.setState({open: false})}
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