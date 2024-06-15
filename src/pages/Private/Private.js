import React, {useContext} from 'react'
import {UserContext} from "../../context/userContext"
import {Outlet, useLocation, Navigate} from "react-router-dom"

export default function Private() {

  const {currentUser} = useContext(UserContext)
  console.log("PRIVATE", currentUser);

  //vérifie si currentUser == true / false pour rediriger sur l'accueil 
  if(!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <Outlet />
    </div>
  )
}