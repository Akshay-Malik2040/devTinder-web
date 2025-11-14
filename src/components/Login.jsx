import React, { useState } from 'react'
import axios from "axios"

const Login = () => {
    const [emailId, setEmailId] = useState("elon@gmail.com");
    const [password, setPassword] = useState("Musk@123");

    const handleLogin=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/login",{
                emailId,password
            },{withCredentials:true})
        } catch(err){
            console.log("Error "+err.message);
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
                    <div className="card-actions justify-end self-center mt-6">
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login