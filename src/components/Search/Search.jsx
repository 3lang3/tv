import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { getSearch } from 'actions';
import debounce from 'lodash/debounce';
import Spinner from 'components/Spinner';
import CategoryItem from 'components/CategoryItem';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  IconFdj,
} from '../Icons';
import styles from './Search.css';


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
    this.closeHander = this.closeHander.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.state = {
      open: false,
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
      this.closeHander();
    }
  }

  closeHander() {
    this.refs.keywordIpt.value = '';
    this.setState({
      open: false,
    });
  }

  searchHandler() {
    const keyword = this.refs.keywordIpt.value;

    if (keyword.trim().length <= 0) {
      console.warn('Can not search empty!');
      return;
    }

    this.setState({
      open: true,
    });

    this.props.getSearch(keyword);
  }

  render() {
    const { loading, error, done, data } = this.props.search;
    const debounced = debounce(this.searchHandler, 800);
    const results = [];

    if (data.length > 0) {
      data.forEach((item, index) => {
                // if(index  > 9 ) return;
        results.push(<CategoryItem filterSwitch={false} online key={item.roomId} type="search" item={item} />);
      });
    }

    const resultsHtml = results.length > 0 ? results : <div className={styles.emptyContent}>抱歉ruarua没有找到任何内容...</div>;

    return (
      <section
        className={styles.searchBar} style={{
          width: this.props.width,
        }}
      >
        <input ref="keywordIpt" onKeyDown={() => debounced()} type="text" placeholder="谁在直播?" />
        <div onClick={debounced} className={styles.fdjico}>
          <IconFdj />
        </div>
        {
                    this.state.open
                        ?
                          <Scrollbars className={styles.scrollBox}>
                            <section onClick={this.closeHander} className={styles.searchResult}>
                              {loading ? <div className={styles.loader}><Spinner color="#fff" size={30} /></div> : ''}

                              { done && !loading ? resultsHtml : '' }
                            </section>
                          </Scrollbars>

                        : ''
                }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  getSearch: keyword => dispatch(getSearch(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
