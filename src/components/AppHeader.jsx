import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,faArrowRight,faBars } from '@fortawesome/free-solid-svg-icons';

function _AppHeader(props) {

  function onBack(){  
    props.history.goBack()
  }

  function onForward(){
    props.history.goForward()
  }

  function toggleNav({target}){
    target.classList.toggle("open")
  }


  return (
    <header className="app-header flex">
      <section className="logo flex auto-center">
        <img src={require('../assets/img/bitcoinIcon.png')} alt="logo" />
        <h1> IT </h1> 
      </section>
      <button className="nav-ham flex auto-center" onClick={(ev)=>toggleNav(ev)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <section className="nav-bar flex"> 
        <NavLink to="/"> Home </NavLink>      
        <NavLink to="/contact"> Contacts </NavLink>
        <NavLink to="/statistic"> Statistic </NavLink>
      </section>  
      <section className="actions-wrapper">
        <button onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>       
        <button onClick={onForward}>     
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </section>   
    </header>
  )
}

export const AppHeader = withRouter(_AppHeader)
