import React from 'react';
import './Room.css'
import Input from "../../Components/UI/Input/Input";
import Message from "../../Components/Message/Message";
import { connect } from 'react-redux'

const Room = props => {
    const welcomeMessage = {
        text: `Welcome ${ props.currentUser } to the room ${ props.room.name }`,
        sender: ''
    };

    return (
        <div className="room col-8" >
            { props.messages.length === 0 && <Message info={ welcomeMessage } /> }
            { props.messages.map((message, index) =>
                <Message
                    key={ message + index }
                    info={ message } />) }
            <Input onSubmit={ props.handleSendMessage } />
        </div >
    )
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, null)(Room);
