import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const targetUserId = useParams();
    const [messages, setMessages] = useState([{ text: "Hello world" }]);
    const user=useSelector(store=>store.user);
    const userId=user?._id;

    useEffect(()=>{
        const socket=createSocketConnection();
        socket.emit("joinChat",{userId,targetUserId})
    },[])

    return (
        <div className='flex h-[70vh] my-3 border border-gray-600 justify-center w-1/2 mx-auto flex-col'>
            <h1 className='border-b p-2 border-gray-500 w-full'>Chat</h1>
            <div className='flex-1'>
                {/* display message */}
                {messages.map((msg, index) => {
                    return (<div key={index}><div className="chat chat-start">
                        <div className="chat-header">
                            Obi-Wan Kenobi
                            <time className="text-xs opacity-50">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">You were the Chosen One!</div>
                        <div className="chat-footer opacity-50">Seen</div>
                        </div>
                        <div className="chat chat-start">
                        <div className="chat-header">
                            Obi-Wan Kenobi
                            <time className="text-xs opacity-50">2 hour ago</time>
                        </div>
                        <div className="chat-bubble">I loved you.</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                        </div></div>);
                })}
            </div>

            <div className='flex border justify-center items-center gap-2 border-gray-500'>
                {/*For input and button */}
                <input className='flex-1 border border-gray-500 rounded-3xl p-2 m-2' type="text" />
                <button className='btn btn-primary rounded-3xl m-2'>Send</button>
            </div>
        </div>
    )
}

export default Chat