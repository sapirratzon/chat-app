import React, { Fragment } from 'react'
import './ItemPreview.css';

const ItemPreview = props => {
    return (
        <Fragment >
            <li className="dropdown-item" onClick={ (event) => props.setSelected(event, props.id) } >
                <h5 > { props.title } </h5 >
                <p > { props.subTitle } </p >
            </li >
            <hr />
        </Fragment >
    );
};

export default ItemPreview;
