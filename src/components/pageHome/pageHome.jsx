import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import styles from './pageHome.css';
import ChangeLog from 'components/Changelog';
import Chat from 'components/Chat';
import Nav from 'components/Nav';
import Category from 'components/Category';
import Stage from 'components/Stage';
import Alert from 'components/Alert';
import ReactTooltip from 'react-tooltip'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import {getCategorys} from 'actions';

const muiTheme = {
  palette: {
    primary1Color: '#3F51B5',
    primary2Color: '#3F51B5',
  }
};

const getData = (props) => {
  if(props.params.category == 'category') {
    props.getCategorys(props.params.name || 'all');
  }else {
    props.getCategorys('all');
  }
  
}

class pageHome extends React.Component {

  componentDidMount() {
    //getData(this.props)
  }

  componentWillUpdate(nextProps) {

    if(this.props.params != nextProps.params) {
      getData(nextProps)
    }
    
  }

  render() {
    const params = this.props.params;
    const loginStatus = this.props.params.category != 'category' ? this.props.params : '';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <div className={styles.container} >
          <Nav />
          <Category type={params} />
          <Stage />
          <Chat />
          <Alert />
          <ChangeLog />
          <ReactTooltip place="top" type="light" effect="solid"/>
        </div>
      </MuiThemeProvider>
    )
  }
}



const mapDispatchToProps = (dispatch, ownProps) => ({
  getCategorys: (name) => dispatch(getCategorys(name))
})

export default connect(null, mapDispatchToProps)(pageHome);