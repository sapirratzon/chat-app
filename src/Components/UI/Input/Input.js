import React, {createRef} from 'react';
import './Input.css'

const Input = props => {
    const userInput = createRef();

    const onSubmit = (event, text) => {
        userInput.current.value = '';
        props.onSubmit(event, text);
    };

    return (
        <div className="inputWrapper" >
            <textarea
                ref = {userInput}
                className="inputArea"
                placeholder="Type a message"
                value={ props.userInput }
                // onChange={ props.setInput }
            />
            <button className="btn btn-info btn-lg" onClick={event => onSubmit(event, userInput.current.value)} >
                <span className="glyphicon glyphicon-send" /> Send
            </button >
        </div >
    )
};

export default Input;
