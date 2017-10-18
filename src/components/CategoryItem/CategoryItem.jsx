import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import classnames from 'classnames';
import ActionEye from 'material-ui/svg-icons/action/visibility';
import { screenItemsAdd } from 'actions';
import { IconUser } from '../Icons';
import styles from './CategoryItem.css';
import config from '../../../config';

const typeHtmlHandler = (props) => {
  const item = props.item;

  switch (props.type) {
    case 'random':

      return (<section className={styles.textSec}>
        <div className={styles.title} title={`${item.anchor}`}>
          {item.anchor}
        </div>
        <div className={styles.ico}>
          <span>{item.type}</span>
        </div>
      </section>);
    default:
      return (<section className={styles.textSec}>
        <div className={styles.title} title={`${item.title}`}>
          {item.title}
        </div>
        <div className={styles.ico}>
          <span><ActionEye /> {item.view}</span>
          <span><IconUser /> {item.anchor}</span>
        </div>
      </section>);
  }
};

class CategoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.imageLoad = this.imageLoad.bind(this);
  }

  imageLoad(e) {
    e.target.className = styles.imgFadeIn;
    return false;
  }

  render() {
    const filterSwitch = this.props.filterSwitch;
    const item = this.props.item;
    const styleType = this.props.type;

    const notShow = (!filterSwitch || !this.props.filter || this.props.filter === item.platform) ? '' : 'notShow';

    const online = this.props.online === true;
    const onlineClass = online ? 'online' : '';

    const outSide = item.platform === 'panda';
    const outSideHtml = outSide ? <section title="由于源限制, 将跳转至源网站观看" className={styles.outside}>站外资源</section> : '';
    const outSidId = item.roomId;

    const typeHtml = typeHtmlHandler(this.props);

    return (
      <section
        onClick={() => {
          !outSide ? this.props.addItem(item) : window.open(`http://panda.tv/${outSidId}`);
        }}
        className={classnames(styles[styleType], styles[notShow], styles[onlineClass])}
      >

        {/* <PlayAdd className={styles.add} />*/}
        <section className={styles.imgWrapper}>
          {
            this.props.type == 'search' || this.props.type === 'random'
                ? item.anchor.substr(0, 1)
                : <LazyLoad
                  overflow={true}
                  resize={true}
                  offset={100}
                  throttle={200}
                  height={'280px'}
                >
                  <figure>
                    <img src={`${item.cover}`} onError={(e)=> e.target.src=`${config.ENDHOST}/images/bilibili_no_img.png`} onLoad={this.imageLoad} />
                  </figure>
                </LazyLoad>
          }
        </section>
        {outSideHtml}
        {typeHtml}
        <div className={styles.onlineTarget}><span>离线</span></div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.categorys.filter,
  category: state.category,
  screenItems: state.screenItems,
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(screenItemsAdd(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
