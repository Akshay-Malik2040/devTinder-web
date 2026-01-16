import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true })
            navigate("/profile")
            dispatch(addUser(res.data.signUpUser))
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId, password
            }, { withCredentials: true })
            dispatch(addUser(res.data.user))
            return navigate("/")
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    return (
        <div className='w-full h-full flex justify-center my-30'>
            <div className="card card-dash bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title self-center font-bold">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    {!isLoginForm && <><fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input className='bg-base-100 py-2 p-2' type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input className='bg-base-100 p-2' type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                        </fieldset> </>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input className='bg-base-100 p-2' type="email" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input className='bg-base-100 p-2' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </fieldset>
                    <p className='text-red-600 font-bold'>{error}</p>
                    <div className="card-actions justify-end self-center mt-2">
                        <button onClick={isLoginForm ? () => handleLogin() : () => handleSignUp()} className="btn btn-primary">{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className='text-center py-2 font-semibold cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Sign Up Here" : "existing User? Login Here"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login