import React from 'react'
import './Channel.css';
import Rooms from "../UI/DropDown/DropDown";

const Channel = props => {

    return (
        <div className="channelWrapper col-4" >
            <h3 className="channel-title" >Channels</h3 >
            <Rooms
                items={ props.rooms }
                setSelected={ props.setSelected } />
        </div >
    );
};

export default Channel;
