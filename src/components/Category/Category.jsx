import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import { getCategory } from 'actions';
import Spinner from 'components/Spinner';
import PageLoader from 'components/PageLoader';
import LazyLoad from 'react-lazyload';
import Error from 'components/Error';
import styles from './Category.css';
import config from '../../../config';

const imageLoad = (e) => {
  e.target.className = styles.imgFadeIn;
  return false;
}

const Category = (props) => {
  const { error, loading, done, data, pageLoading } = props.category;
  const itemHtml = [];

  !!data.length && data.forEach((el, index) => {
    const item = (<div className={styles.itemWrapper} key={index}>
      <div className={styles.item}>
        <Link to={`/categorys/${el.type}`}>
          <LazyLoad
            overflow={true}
            resize={true}
            offset={100}
            throttle={200}
            height={'330px'}
          >
            <figure><img onLoad={imageLoad} src={`${config.ENDHOST}/images/${el.type.indexOf(':') > -1 ? el.type.replace(':', '-') : el.type}.jpg`} /></figure>
          </LazyLoad>
          <h5>{el.type}</h5>
          <p>{el.tv} 名主播 | {el.view}人气</p>
        </Link>
      </div>
    </div>);
    itemHtml.push(item);
  });

  for (let k = 0; k < 10; k++) {
    itemHtml.push(<div key={`empty${k}`} className={styles.itemWrapper} />);
  }

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <Scrollbars className="ScrollContainer">
          {loading ? <Spinner size={50} /> : ''}
          {error ? <Error img={require('../../../assets/error_fetch.svg')} content="Ooops,服务器好像出了点小问题" /> : itemHtml}
        </Scrollbars>
      </div>

    </div>
  )
}


const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  getCategory: () => dispatch(getCategory()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Category);
