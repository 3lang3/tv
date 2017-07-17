import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import IconButton from 'material-ui/IconButton';
import ActionSetting from 'material-ui/svg-icons/action/settings';
import { alertOpen } from 'actions';
import styles from './ChatSetting.css';

const colorBlock = [
  '#ff0000',
  '#0000ff',
  '#008000',
  '#ff4500',
  '#ff7f50',
  '#9acd32',
  '#bcbcbc',
  '#2e8b57',
  '#daa520',
  '#d2691e',
  '#5f9ea0',
  '#1e90ff',
  '#ff69b4',
  '#8a2be2',
];

class ChatSetting extends React.Component {
  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
        // this.changNameColor = this.changNameColor.bind(this);
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
    return this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  changNameColor(e) {
    this.setState({ isOpen: false });
    this.props.alertOpen('弹幕昵称颜色切换成功');

    return localStorage.setItem('__barrage_name_color', e.target.style.backgroundColor);
  }

  render() {
    const toggleClass = this.state.isOpen ? 'open' : '';
    const colorsHtml = [];

    colorBlock.map((value, key) => {
      colorsHtml.push(<span key={key} onClick={e => this.changNameColor(e)} style={{ backgroundColor: value }} />);
    });

    return (
      <div className={styles.setting}>
        <IconButton data-tip="弹幕设置" onClick={this.toggleOpen}>
          <ActionSetting />
        </IconButton>
        <section className={classnames(styles.settingSection, styles[toggleClass])}>
          <section>
            <h4>名称颜色</h4>
            <section className={styles.colorSection}>
              {colorsHtml}
            </section>
            {/* <h4 className={styles.lineTop}>
                            <Toggle
                                onToggle={(event, isInputChecked) => {
                                    console.log(isInputChecked)
                                }}
                                thumbStyle={{
                                    backgroundColor: '#f5f5f5',
                                }}
                                trackStyle={{
                                    backgroundColor: '#bdbdbd',
                                }}
                                thumbSwitchedStyle={{
                                    backgroundColor: '#f5f5f5',
                                }}
                                trackSwitchedStyle={{
                                    backgroundColor: '#9acd32',
                                }}
                                labelStyle={{
                                    color:'#888',
                                }}
                                label="夜间模式"
                            />
                        </h4>*/}
          </section>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertOpen: message => dispatch(alertOpen(message)),
});

export default connect(null, mapDispatchToProps)(ChatSetting);
