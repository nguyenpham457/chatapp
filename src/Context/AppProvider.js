import React, { createContext, useState,useContext, useMemo }  from 'react';
import { AuthContext } from './AuthProvider';
import useFireStore from '../hooks/useFirestore';
export const AppContext = createContext()


function AppProvider({children}) {
    const [selectedRoomId,setSelectedRoomId] = useState('')
    const [isAddRoomVisible,setIsAddRoomVisible] = useState(false)
    const [isInviteMemberVisible,setIsInviteMemberVisible] = useState(false)
    const [isEditUserVisible,setIsEditUserVisible] = useState(false)

    const {user} = useContext(AuthContext)
    const roomsCondition = useMemo(()=>{
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid
        }
    },[user.uid])

    const rooms = useFireStore('rooms',roomsCondition);
    const selectedRoom = useMemo(()=>rooms.find(room =>room.id === selectedRoomId),[rooms,selectedRoomId]) 
    const usersCondition = useMemo(()=>{
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom?.members
        }
    },[selectedRoom])
    const members = useFireStore('users',usersCondition)

    return (
        <AppContext.Provider value={{ rooms,isAddRoomVisible,setIsAddRoomVisible
        ,selectedRoomId,setSelectedRoomId,selectedRoom,members,isInviteMemberVisible,setIsInviteMemberVisible,
        isEditUserVisible,setIsEditUserVisible }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;