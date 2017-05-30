import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { forceCheck } from 'react-lazyload';
import styles from './Favorite.css';
import classnames from 'classnames';
import CategoryItem from 'components/CategoryItem';

import IconButton from 'material-ui/IconButton';
import FavoriteBroIco from 'material-ui/svg-icons/action/favorite-border';

import { getOnline } from 'actions';

const onlineFiter = (item, onlines) => {
    let _target = false;

    onlines.forEach((online, index) => {
        if(online.anchor == item.anchor && online.roomId == item.roomId) _target = true; 
    })

    return _target;
}

class Favorite extends React.Component {
    constructor(props) {
        super(props)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.toggleOpen = this.toggleOpen.bind(this)
        this.closeHander = this.closeHander.bind(this)
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
            this.setState({ open: false })
        }
    }

    closeHander() {
        this.setState({ open: false })
    }

    toggleOpen() {
        if(!this.state.open) {
            let data = this.props.favorite;
            this.props.getOnline(data)
        }
        this.setState({
            open: !this.state.open,
        })
    }


    render() {
        let open = this.state.open ? 'open' : '';
        let favoriteList = this.props.favorite;
        let onlineFavoriteList = this.props.online.data;
        let favoriteHtml = [];

        if(favoriteList instanceof Array) {
            favoriteList.forEach((item, index) => {
                let online = onlineFiter(item, onlineFavoriteList);

                favoriteHtml.push(<CategoryItem favoriteStatus={true} key={item.roomId} online={online} type="search" item={item} />)
            })
        }

        return (
            <IconButton tooltip="关注">
                <FavoriteBroIco  onTouchTap={this.toggleOpen} />
                <div className={classnames(styles.favorite, styles[open])}>
                    <div className={styles.favoriteContent}>
                        
                            {favoriteHtml}
                        
                    </div>
                </div>
            </IconButton>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    online: state.online,
    favorite: state.favorite.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getOnline: (data) => dispatch(getOnline(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);