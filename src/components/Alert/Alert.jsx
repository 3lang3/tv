import React from 'react';
import { connect } from 'react-redux';
import styles from './Alert.css';

import Snackbar from 'material-ui/Snackbar';

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autoHideDuration: 2500,
        };
    }

    render() {
        const {open: open, message: message } = this.props.alert;

        return (
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={this.state.autoHideDuration}
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