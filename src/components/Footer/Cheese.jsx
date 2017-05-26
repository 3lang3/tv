import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import styles from './Footer.css';3
import TextField from 'material-ui/TextField';

import { 
  alertOpen,
  getCheese,
 } from 'actions';
import {IconCheese} from '../Icons';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class Cheese extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCheese = this.handleCheese.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
        open: false,
    };
  }
  
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleSubmit() {
    this.props.alertOpen('RUARUA.live有您的支持甚感荣幸, 24小时之内您将出现在赞助榜单中.')
    //this.props.getCheese() 等待cheese接口
    this.handleClose()
  }

  handleCheese() {
      this.setState({
          cheese: true,
      })
  }

  render() {
    const submitText = '扫码赞助之后请点这里';
    const submitAction = this.handleSubmit;

    const actions = [
      <FlatButton
        label={submitText}
        primary={true}
        keyboardFocused={true}
        onTouchTap={submitAction}
      />,
      <FlatButton
        label="下次再说"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      

      <div className={styles.btn}>
        <IconButton
            tooltip="给予赞助"
            tooltipPosition="top-right"
            onClick={() => this.handleOpen()}
          >
            <IconCheese />
        </IconButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          bodyClassName={styles.outerClass}
          contentClassName={styles.contentClass}
          overlayClassName={styles.overlayClass}
        >
          <div className={styles.cheeseContent}>
              <section>
                <h2>需要你的帮助!</h2>
                <p>RUARUA.live是无盈利的开源站点，如果您对网站有兴趣,希望网站持续提供优质资源, 也许您能帮我分担一点服务器费用...</p>
              </section>
              <section className={styles.payContent}>
                <section className={styles.cheeseSvgBox}>
                    <IconCheese />
                </section>
                <p>本月目标: <strong>245</strong> rmb(服务器费用)</p>
                <p>完成目标: <strong>0</strong> rmb</p>
                <section className={styles.payBox}>
                    <div>
                        <img src={require('../../../assets/ali_pay.jpg')} alt=""/>
                        <p>支付宝</p>
                    </div>
                    <div>
                        <img src={require('../../../assets/wechat_pay.jpg')} alt=""/>
                        <p>微信</p>
                    </div>
                    
                </section>
              </section>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  alertOpen: (clas) => dispatch(alertOpen(clas)),
  getCheese: (body) => dispatch(getCheese(body)),
})

export default connect(null, mapDispatchToProps)(Cheese)