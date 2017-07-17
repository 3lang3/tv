import React from 'react';
import { connect } from 'react-redux';
import CategoryItem from 'components/CategoryItem';
import { Scrollbars } from 'react-custom-scrollbars';
import Spinner from 'components/Spinner';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import { getRandom } from 'actions';
import styles from './Random.css';

class Random extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRandom();
  }

  render() {
    const { loading, error, done, data } = this.props.random;

    const randomHtml = [];

    !!data.length && data.forEach((item) => {
      randomHtml.push(<CategoryItem key={item.roomId} online type="random" item={item} />);
    });

    return (
      <div className={styles.favorite}>
        <h4>随机推荐 <span onClick={() => this.props.getRandom()}><RefreshIcon /></span></h4>
        <Scrollbars className={styles.scrollBox}>
          <div className={styles.favoriteContent}>
            {loading ? <div style={{ marginTop: '40%' }}><Spinner color="#fff" size={30} /></div> : ''}

            { done || error ? randomHtml : ''}

          </div>
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  random: state.random,
});

const mapDispatchToProps = dispatch => ({
  getRandom: () => dispatch(getRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Random);
