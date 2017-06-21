import React from 'react';
import { connect } from 'react-redux';
import styles from './Random.css';
import CategoryItem from 'components/CategoryItem';
import { Scrollbars } from 'react-custom-scrollbars';
import Spinner from 'components/Spinner';
import RefreshIcon from 'material-ui/svg-icons/Navigation/refresh';

import { getRandom } from 'actions';

class Random extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getRandom();
    }

    render() {
        const {loading: loading, error: error, done: done, data: data } = this.props.random;

        let randomHtml = [];

        !!data.length && data.forEach((item, index) => {
            randomHtml.push(<CategoryItem key={item.roomId} online={true} type="random" item={item} />)
        })

        return (
            <div className={styles.favorite}>
                <h4>随机推荐 <span onClick={() => this.props.getRandom()}><RefreshIcon /></span></h4>
                <Scrollbars className={styles.scrollBox}>
                    <div className={styles.favoriteContent}>
                        {loading ? <div style={{marginTop: '40%'}}><Spinner color="#fff" size={30} /></div> : ''}
                        
                            { done || error ? randomHtml : ''}
                        
                    </div>
                </Scrollbars>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    random: state.random,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRandom: () => dispatch(getRandom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Random);