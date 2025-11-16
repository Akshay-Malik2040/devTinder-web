import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user=useSelector((store)=>store.user)
  const [emailId, setEmailId] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Musk@123");
  
  return (
    <div className='w-full h-full flex justify-center my-30'>
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title self-center font-bold">Update Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input type="email" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </fieldset>
          <div className="card-actions justify-end self-center mt-6">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile