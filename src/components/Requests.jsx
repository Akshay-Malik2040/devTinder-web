import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const requestsForReview = useSelector((store) => store.requests);
    const fetchRequests = async () => {
        const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
        console.log(res.data.connectionRequest);
        dispatch(addRequest(res.data.connectionRequest))
    }

    useEffect(() => {
        fetchRequests();
    }, [])

      const reviewRequest = async (status, _id) => {
            try {
                const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
                dispatch(removeRequest(res));
            } catch (err) {
                console.log(err.message)
            }
        }

    if (!requestsForReview) return <h1>Loading...</h1>
    if (requestsForReview.length === 0) return <h1>No Connection Request</h1>
    return (
        <div>
            {requestsForReview.map((request) => (
                <div key={request.fromUserId._id} className='flex justify-evenly w-1/2 bg-base-300 rounded my-4 mx-auto items-center'>
                        <div>
                            {request.fromUserId.firstName + " " + request.fromUserId.lastName}
                        </div>
                        <div>{request.fromUserId.about}
                        </div>
                        <div className='flex gap-2 py-2'>
                            <button className="btn" onClick={() => { reviewRequest("accepted", request._id) }}>
                                Accept
                            </button>
                            <button className="btn" onClick={() => { reviewRequest("rejected", request._id) }}>
                                Reject
                            </button>
                        </div>

                </div>
            ))}
        </div>
    )
}

export default Requests