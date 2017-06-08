import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ScreenItem from 'components/ScreenItem';
import styles from './Banner.css';

import { changeBanner } from 'actions';



class Banner extends React.Component {

    constructor(props) {
        super(props)

        this.changeBanner = this.changeBanner.bind(this)
        
        this.state = {
            active: 0,
        }
    }

    componentDidMount() {
      
    }

    componentDidUpdate() {
        
    }

    changeBanner(item, i) {
        this.props.changeBanner(item)
        this.setState({
            active: i,
        })
    }


    render() {
        const {items: items, index: index } = this.props.banner;
        let itemsHtml = [];

        items.forEach((item, key) => {
            itemsHtml.push(
                <section key={`${item.roomId}`} onClick={() => this.changeBanner(item, key)} className={styles.item}>
                    <img src={item.cover} alt={item.title} title={item.title}/>
                </section>
            )
        })

        

        return (
            <div className={styles.banner}>
                <section className={styles.player}>
                    <ScreenItem isBanner={true} item={index} screenCount={1} />
                </section>
                <section className={classnames(styles.list, styles[`active${this.state.active}`])}>
                    {itemsHtml}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    banner: state.banner,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeBanner: (item) => dispatch(changeBanner(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner);