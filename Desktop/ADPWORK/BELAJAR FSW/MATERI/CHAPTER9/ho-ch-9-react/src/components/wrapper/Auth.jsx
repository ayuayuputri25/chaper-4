import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../config/firebaseConfig';
const Auth = ({children}) => {
    const auth = getAuth(firebaseConfig)
    const [user, loading] = useAuthState(auth)
    let location = useLocation();
    if(loading)
         return <h5>checking authentication...</h5>
    else if(user){
         return children
    }

  return <Navigate to='/login' state={{ from: location}} replace />
}

export default Auth