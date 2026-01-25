import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId })

        socket.on("messageReceived", ({ firstName, text }) => {
            console.log(firstName + ": " + text);
            setMessages((messages) => [...messages, { firstName, text }]);
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            targetUserId,
            text: newMessage
        })
        setNewMessage("");
    }

    return (
        <div className='flex h-[70vh] my-3 border border-gray-600 justify-center w-1/2 mx-auto flex-col'>
            <h1 className='border-b p-2 border-gray-500 w-full'>Chat</h1>
            <div className='flex-1 overflow-y-auto'>
                {/* display message */}
                {messages.length>0 && messages.map((msg, index) => {
                    return (<div key={index}>
                        <div className="chat chat-start">
                            <div className="chat-header">
                                {msg.firstName}
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    </div>);
                })}
            </div>

            <div className='flex border justify-center items-center gap-2 border-gray-500'>
                {/*For input and button */}
                <input value={newMessage}
                    onChange={(e) => { setNewMessage(e.target.value) }} className='flex-1 border border-gray-500 rounded-3xl p-2 m-2' type="text" />
                <button onClick={sendMessage} className='btn btn-primary rounded-3xl m-2'>Send</button>
            </div>
        </div>
    )
}

export default Chat