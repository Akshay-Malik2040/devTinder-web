import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(res.data.data))
        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return <h1 className='text-center py-4 font-bold'>Loading...</h1>
    if (connections.length === 0) return <h1 className='text-center py-4 font-bold'>No Connection Found</h1>
    return connections && (
        <div>
            <h1 className='text-center py-2 font-bold text-3xl'>Connections</h1>
            <div className='flex justify-center'>
                {connections.map((connection) => (
                    <div key={connection._id} className='flex justify-between w-1/2 bg-base-300 rounded my-4 mx-auto'>
                        <div className='my-2 mx-4'><div>{connection.firstName + " " + connection.lastName}</div>
                            <div>{connection.about}</div></div>
                        <p></p>
                        <Link to={"/chat/"+connection._id}><button className='bg-primary mx-3 my-2 p-3 rounded-3xl'>Chat</button></Link>
                        {/* <Link to={"/user"+connection._id}><button>Chat</button></Link> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Connections