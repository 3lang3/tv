import React from 'react';
import {connect} from 'react-redux';
import { getSearch } from 'actions';
import styles from './Search.css';
import  debounce  from 'lodash/debounce';
import Spinner from 'components/Spinner';
import CategoryItem from 'components/CategoryItem';
import { 
  IconFdj
} from '../Icons';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchHandler = this.searchHandler.bind(this)
    }

    searchHandler() {
        let keyword = this.refs.keywordIpt.value;

        this.props.getSearch(keyword)
    }

    render() {
        const {loading: loading, error: error, done: done, data: data } = this.props.search;
        

        return (
            <section className={styles.searchBar} style={{
                width: this.props.width,
            }}>
                <input ref="keywordIpt" type="text" placeholder="Search" />
                <div onClick={this.searchHandler} className={styles.fdjico}>
                    <IconFdj />
                </div>
                <section className={styles.searchResult}>
                    <section className={styles.list}>
                        {data.length > 0 ? <CategoryItem item={data[0]} /> : ''}
                    </section>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    search: state.search,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSearch: (keyword) => dispatch(getSearch(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)