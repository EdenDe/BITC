import React, {useState } from 'react'
import { authService } from '../services/auth.service'
import { useHistory } from "react-router-dom";

 export default function SignupPage() {
  const [user, setUser] = useState(authService.getEmptyUser())
  let history = useHistory();

  const onSignup = async (ev) =>{
    ev.preventDefault()
    try {
      await authService.signup(user)
      history.push('/homepage')
    } catch (error) {
      console.log(error)
    }
  }

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
