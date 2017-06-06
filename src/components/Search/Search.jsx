import React from 'react';
import { findDOMNode } from 'react-dom';
import {connect} from 'react-redux';
import { getSearch } from 'actions';
import styles from './Search.css';
import  debounce  from 'lodash/debounce';
import Spinner from 'components/Spinner';
import CategoryItem from 'components/CategoryItem';
import { forceCheck } from 'react-lazyload';
import { Scrollbars } from 'react-custom-scrollbars';
import { 
  IconFdj
} from '../Icons';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchHandler = this.searchHandler.bind(this)
        this.closeHander = this.closeHander.bind(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.state = {
            open: false,
        }
    }

    componentDidUpdate() {
        forceCheck()
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
    }

    handleDocumentClick (event) {
        if (!findDOMNode(this).contains(event.target)) {
            this.closeHander()
        }
    }

    closeHander() {
        this.refs.keywordIpt.value = '';
        this.setState({
            open: false,
        })
    }

    searchHandler() {
        let keyword = this.refs.keywordIpt.value;

        if (keyword.trim().length <= 0) {
            console.warn('Can not search empty!');
            return;
        }

        this.setState({
            open: true,
        })

        this.props.getSearch(keyword)
    }

    render() {
        const {loading: loading, error: error, done: done, data: data } = this.props.search;
        const debounced = debounce(this.searchHandler, 800);
        let results = [];

        if(data.length > 0) {
            data.forEach( (item, index) => {
                //if(index  > 9 ) return;
                results.push(<CategoryItem filterSwitch={false} key={item.roomId} type="search" item={item} />)
            })
        }

        let resultsHtml = results.length > 0 ? results : <div className={styles.emptyContent}>抱歉ruarua没有找到任何内容...</div>

        return (
            <section className={styles.searchBar} style={{
                width: this.props.width,
            }}>
                <input ref="keywordIpt" onKeyDown={() => debounced()} type="text" placeholder="谁在直播?" />
                <div onClick={debounced} className={styles.fdjico}>
                    <IconFdj />
                </div>
                {
                    this.state.open 
                        ? 
                                <Scrollbars style={{
                                    maxHeight: '200px',
                                    height: '200px'
                                }}>
                                    <section onClick={this.closeHander} className={styles.searchResult}>
                                        {loading ? <Spinner color="#5b6ca9" size={30} /> : ''}

                                        { done && !loading ? resultsHtml : '' }
                                    </section>
                                </Scrollbars>
                            
                        : ''
                }
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