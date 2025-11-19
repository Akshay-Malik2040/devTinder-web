import React from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
    const {firstName,lastName,about}=user
    const dispatch=useDispatch()
    const handleSendRequests=async (status,userId)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
            dispatch(removeUserFromFeed(userId));
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure className='w-full h-50'>
                    <img
                        src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                        alt="profileImg" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName+" "+lastName}</h2>
                    <p>{about}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={()=>{handleSendRequests("ignored",user._id)}}>Ignore</button>
                        <button className="btn btn-secondary" onClick={()=>{handleSendRequests("interested",user._id)}}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard