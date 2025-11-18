import React, { use, useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setlastName] = useState(user?.lastName);
  const [about,setAbout]=useState(user?.about)
  const dispatch=useDispatch()

  const saveProfile=async()=>{
   try {
  const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,about},{withCredentials:true});
  console.log(res);
  // dispatch(addUser())}
  } catch(err){
    console.log(err)
  }
}

  return (
    <div className='w-full h-full flex justify-center my-10 gap-10'>
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title self-center font-bold">Update Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" value={lastName} onChange={(e) => { setlastName(e.target.value) }} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">about</legend>
            <input type="text" value={about} onChange={(e) => { setAbout(e.target.value) }} />
          </fieldset>
          <div className="card-actions justify-end self-center mt-6">
            <button onClick={saveProfile} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>

      <div>
        <UserCard user={{firstName,lastName,about}}/>
      </div>
    </div>
  )
}

export default EditProfile