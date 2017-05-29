import React from 'react';
import { connect } from 'react-redux';
import styles from './Alert.css';

import Snackbar from 'material-ui/Snackbar';

class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {open: open, message: message , duration: duration} = this.props.alert;

        return (
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={duration}
                className={styles.alert}
             />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    alert: state.alert,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // dispatchAlert: .alert,
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert);