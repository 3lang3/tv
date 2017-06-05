import React from './react';
import { connect } from 'react-redux';

import styles from './Recommend.css';

class Recommend extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>Recommend content</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    recommend: state.recommend,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);