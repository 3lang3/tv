import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategory } from 'actions';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import styles from './Category.css';
import config from '../../../config';

const Category = (props) => {
  const { error, loading, done, data } = props.category;
  const itemHtml = [];

  !!data.length && data.forEach((el, index) => {
    const item = (<div className={styles.itemWrapper} key={index}>
      <div className={styles.item}>
        <Link to={`/categorys/${el.name}`}>
          <figure><img src={`${config.ENDHOST}/images/${el.name}.jpg`} /></figure>
          <h5>{el.name_cn} | {el.name_en}</h5>
          <p>{el.count} 名主播</p>
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
        {loading ? <Spinner size={50} /> : ''}
        {error ? <Error img={require('../../../assets/error_fetch.svg')} content="Ooops,服务器好像出了点小问题" /> : itemHtml }
      </div>

    </div>
  );
};


const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  getCategory: () => dispatch(getCategory()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Category);
