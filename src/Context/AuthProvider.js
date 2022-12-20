import React, { useEffect,createContext, useState }  from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { Spin } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user,setUser]= useState({})
    const history = useHistory();
    const [isLoading, setIsLoading]= useState(true)
    const fetchData =  async(userUid) => {
        if(userUid){
            const q = query(collection(db, 'users'), where("uid", "==", userUid));
            const querySnapshot = await getDocs(q);
            let userData = {};
            querySnapshot.forEach((doc) => {
                userData ={...doc.data(),
                    docId :doc.id};
            });
            return userData;
        }
        return {};
        
    }

    useEffect(()=>{
        const unsubscribed = auth.onAuthStateChanged(async(data)=>{
            if(data){
                const userData = await fetchData(data?.uid)
                if(userData){
                    const { displayName,email,uid,photoURL,docId} = userData;
                    setUser({ displayName,email,uid,photoURL,docId});
                    setIsLoading(false)
                    history.push('/');
                } 
            }else {
                setUser({})
                setIsLoading(false)
                history.push('/login')
            }})
        // clean function
        return ()=>{
            unsubscribed();
        }
    },[history])

    return (
        <AuthContext.Provider value={{ user,setUser }}>
        {  isLoading ? <Spin/>:  children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;