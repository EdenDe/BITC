import React, {useEffect, useState } from 'react'
import { authService } from '../services/auth.service'
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { addUser } from '../store/actions/user.actions';

 export default function SignupPage() {
  const loggedUser = useSelector((storeState)=> storeState.userModule.loggedInUser)

  const [user, setUser] = useState(authService.getEmptyUser())
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSignup = async (ev) =>{
    ev.preventDefault()
    try {
      dispatch(addUser(user))
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(loggedUser)navigate('/')
    
  },[loggedUser])

  const handleChange=({target})=>{
    setUser({...user, username: target.value})
  }

  return (
    <section className="signup-page"> 
      <section className="signup-wrapper"> 
        <div className="img-wrapper flex justify-center">
          <img src={require('../assets/img/bitcoinIcon.png')} alt="logo" />
        </div>
        <h1>Welcome to BITC</h1>
        <form onSubmit={onSignup}>
          <p>Please enter your name</p>
          <input onChange={handleChange} value={user.username} type="text"/>
          <button className="btn-save">Save</button>    
        </form>
      </section>
    </section>
  )
}
