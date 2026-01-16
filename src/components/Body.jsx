import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constant'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import axios from "axios";


const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const fetchUser=async()=>{
    try{
      const user=await axios.get(BASE_URL+"/profile",{withCredentials:true});
      dispatch(addUser(user.data.loggedInUser));
    }catch(err){
      console.log("Error in Body Component")
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])


  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body