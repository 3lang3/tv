import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import styles from './Category.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { getCategory } from 'actions';

class Category extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getCategory();
    }

    render() {

        const {error: error, loading: loading, done: done, data: data} = this.props.category;
        let itemHtml = [];

        !!data.length && data.forEach((el, index) => {
            let _item = <div className={styles.itemWrapper} key={index}>
                            <div className={styles.item}>
                                <Link to={`/categorys/${el.name}`}>
                                    <figure><img src={`http://localhost:3000/images/${el.name}.jpg`} /></figure>
                                    <h5>{el.name_en}</h5>
                                    <p>{el.count} 名主播</p>
                                </Link>
                            </div>
                        </div>
            itemHtml.push(_item)
        });

        return (
            <div className={styles.container}>
                
                    <div className={styles.content}>
                        {itemHtml}
                    </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    category: state.category,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategory: () => dispatch(getCategory())
})


export default connect(mapStateToProps, mapDispatchToProps)(Category);