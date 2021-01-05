import React, { useState, useEffect, Fragment } from 'react'
import './Chat.css';
import Channel from "../../Components/Channel/Channel";
import Room from "../Room/Room";
import { connect } from 'react-redux'

const Chat = props => {
        const [rooms, setRooms] = useState([]);
        const [roomsMessages, setRoomsMessages] = useState([]);
        const [selectedRoom, setSelectedRoom] = useState(null);

        const handleSelectedRoom = (event, roomID) => {
            if (!props.currentUser) {
                const username = prompt('Please enter your name');
                const color = `hsl(  ${ 360 * Math.random() },${ 25 + 70 * Math.random() }%, ${ 85 + 10 * Math.random() }%)`;
                props.onLogin(username, color);
            }
            setSelectedRoom(rooms.find(currentRoom => currentRoom.id === roomID));
            getRoomMessages(roomID);
        };

        const handleSendMessage = async (event, text) => {
            const message = {
                roomId: selectedRoom.id,
                sender: props.currentUser,
                text: text
            };
            sendMessage(message);
        };

        const getRoomMessages = roomID => {
            const xhrGetRoomMessages = new XMLHttpRequest();
            xhrGetRoomMessages.addEventListener('load', () => {
                if (xhrGetRoomMessages.status === 200) {
                    const messages = convertStringToJSON(xhrGetRoomMessages.responseText);
                    setRoomsMessages(messages ? messages : []);
                }
            });
            xhrGetRoomMessages.open('POST', `${process.env.REACT_APP_API}/chat/getAllMessages`);
            xhrGetRoomMessages.setRequestHeader("Content-Type", "application/json");
            xhrGetRoomMessages.send(JSON.stringify({roomId: roomID}));
        };

        const sendMessage = message => {
            const xhrSendMessage = new XMLHttpRequest();
            xhrSendMessage.addEventListener('load', () => {
                if (xhrSendMessage.status === 200)
                    setRoomsMessages(convertStringToJSON(xhrSendMessage.responseText));
            });
            xhrSendMessage.open('POST', `${process.env.REACT_APP_API}/chat/sendMessage`);
            xhrSendMessage.setRequestHeader("Content-Type", "application/json");
            xhrSendMessage.send(JSON.stringify({roomId: selectedRoom.id, message: message}));
        };

        const handleSetRooms = roomsResponse => {
            if (selectedRoom) {
                const room = roomsResponse.find(room => room.id === selectedRoom.id);
                setRoomsMessages(room.messages ? room.messages : []);
            }
            let roomsOnly = [...roomsResponse];
            roomsOnly.map(room => room.messages ? delete room["messages"] : null);
            setRooms(roomsOnly);
        };

        const convertStringToJSON = response => {
            return JSON.parse(response);
        };

        const getRooms = () => {
            const xhrgetRooms = new XMLHttpRequest();
            xhrgetRooms.addEventListener('load', () => {
                if (xhrgetRooms.status === 200) {
                    handleSetRooms(convertStringToJSON(xhrgetRooms.response));
                }
            });
            xhrgetRooms.open('POST', `${process.env.REACT_APP_API}/chat/getChatRooms`);
            xhrgetRooms.setRequestHeader("Content-Type", "application/json");
            xhrgetRooms.send();
        };


        useEffect(() => {
            getRooms();
        }, [rooms]);

        return (
            <Fragment >
                <h1 > { selectedRoom ? selectedRoom.name : 'Welcome !' } </h1 >
                <div className="chat" >
                    <Channel
                        rooms={ rooms }
                        setSelected={ handleSelectedRoom } />
                    { selectedRoom && <Room
                        room={ selectedRoom }
                        messages={ roomsMessages }
                        handleSendMessage={ handleSendMessage } /> }
                </div >
            </Fragment >
        );
    }
;

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, userColor) => dispatch({
            type: 'LOGIN',
            payload: {
                username: username,
                userColor: userColor
            }
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
