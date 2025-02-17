import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}:{children:React.ReactNode}) => {

  const {token} = useSelector((state:any)=>state.auth);

  if(!token)
    return children
  else
    return <Navigate to={'/'}/>
}

export default OpenRoute
