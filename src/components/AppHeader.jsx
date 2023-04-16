import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
 
function _AppHeader(props) {

  function onBack(){
    props.history.goBack()
  }

  return (
    <header className="app-header">
      <section className="back">
        <button onClick={onBack}>back</button>
      </section>
      <section className="container">
        <NavLink to="/"> Home </NavLink>      
        <NavLink to="/contact"> Contacts </NavLink>
        <NavLink to="/statistic"> Statistic </NavLink>
      </section>
    </header>
  )
}

export const AppHeader = withRouter(_AppHeader)
