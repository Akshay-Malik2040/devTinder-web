import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const navigate=useNavigate()
    const [emailId, setEmailId] = useState("elon@gmail.com");
    const [password, setPassword] = useState("Musk@123");
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const handleLogin=async ()=>{
        try{
            const res=await axios.post(BASE_URL+"/login",{
                emailId,password
            },{withCredentials:true})
            dispatch(addUser(res.data.user))
            return navigate("/")
        } catch(err){
            setError(err.response.data.error)
        }
    }

    return (
        <div className='w-full h-full flex justify-center my-30'>
            <div className="card card-dash bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title self-center font-bold">Login</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    </fieldset>
                    <p className='text-red-600 font-bold'>{error}</p>
                    <div className="card-actions justify-end self-center mt-6">
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login