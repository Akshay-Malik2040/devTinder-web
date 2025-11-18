import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import UserCard from './UserCard';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();

    const getFeed=async ()=>{
       try{ if(feed!=null) return;
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res.data.users));
        } catch(err){
            //handle error
        }
    }

    useEffect(()=>{
        getFeed();
    },[])

    if(!feed) return;
    if(feed.length===0) return <h1>No more Users</h1>
  return (
    <div className='flex justify-center my-5'>
        {feed ? <UserCard user={feed[0]}/>:<div>Loading...</div>}
    </div>
  )
}

export default Feed