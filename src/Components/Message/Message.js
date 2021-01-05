import React from 'react'
import './Message.css';
import { connect } from "react-redux";

const Message = props => {
    const messageSide = (!props.currentUser) || props.currentUser === props.info.sender ? 'left' : 'right';

    return (
        <div className="message" style={ {"backgroundColor": `${ props.userColor ? props.userColor : '#89c593a6' }`, "float": `${ messageSide }`} } >
            <i className={props.currentUser === props.info.sender ? 'fas fa-user-secret' : 'fas fa-user-ninja'} >
                <span className="username" >{ props.info.sender }</span >
            </i >
            <p >{ props.info.text }</p >
        </div >
    );
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        userColor: state.userColor
    };
};
export default connect(mapStateToProps, null)(Message);
