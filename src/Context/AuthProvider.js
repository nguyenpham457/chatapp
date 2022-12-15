import React, { useEffect,createContext, useState }  from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';
export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user,setUser]= useState({})
    const history = useHistory();
    const [isLoading, setIsLoading]= useState(true)

    useEffect(()=>{
       const unsubscribed = auth.onAuthStateChanged((user)=>{
            if(user){
                const { displayName,email,uid,photoURL} = user;
                setUser({ displayName,email,uid,photoURL});
                setIsLoading(false)
                history.push('/');
            } else {
                setIsLoading(false)
                history.push('/login')
            }
        })
        // clean function
        return ()=>{
            unsubscribed();
        }
    },[history])
   
    return (
        <AuthContext.Provider value={{ user }}>
          {  isLoading ? <Spin/>:  children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;