import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Button, Avatar, Tooltip, Alert,Modal } from 'antd';
import styled from 'styled-components';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import {useFireStoreWithOrderBy } from '../../hooks/useFirestore';
import InputChat from './InputChat';
import moment from 'moment/moment';
import { AuthContext } from '../../Context/AuthProvider';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const HeaderStyled = styled.div`
    display:flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230,230,230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin:0;
            font-weight: bold;
        }

        &__description {
            fon-size: 12px
        }
    }
`
const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;

`
const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`


const WrapperStyled = styled.div`
    height: 100vh;
`


function ChatWindow() {
    const {selectedRoom ,members, setIsInviteMemberVisible ,setSelectedRoomId} = useContext(AppContext)
    const {user} = useContext(AuthContext)
    const messageListRef = useRef(null);
    const messageCondition = useMemo(()=>({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom?.id,
    }),[selectedRoom?.id])
    const orderByData = useMemo(()=>({
        orderByName: 'createAt',
        orderByDirection: 'desc'
    }),[])
    const messages = useFireStoreWithOrderBy('messages',messageCondition,10,orderByData).sort((a,b) => a.createAt-b.createAt);

    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
        messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

    const formatDate = (time) =>{
        const data = moment(time* 1000).fromNow();
        return data;
    }

    const handleLeftRoom = () => {
        Modal.confirm({
            okText: 'Ok',
            cancelText: 'Hủy',
            title: `Thoát room "${selectedRoom?.name}" này hử?'`,
            onOk: submitLeftRoom,
        })
    }

    const submitLeftRoom = () =>{
        setSelectedRoomId('');
        const roomRef = doc(db,'rooms',selectedRoom.id);
        if(selectedRoom.members && selectedRoom.members.length === 1){
            // delete room and messages
            deleteDoc(roomRef)
        } else {
            // update members in room
        const members = selectedRoom.members.filter((mem)=>mem !== user.uid)
        updateDoc(roomRef,{
            members
        })
    }
    }
    return (
        <WrapperStyled>
            {selectedRoom ? <>
                <HeaderStyled>
                <div className='header__info'>
                    <p className='header__title'>{selectedRoom?.name}</p>
                    <span className='header__description'>{selectedRoom?.description}</span>
                </div>
        <ButtonGroupStyled>
            <Button type='text' icon={<UserAddOutlined/>}
            onClick={()=>setIsInviteMemberVisible(true)}
            >Mời bạn</Button>
            <Button type='text' icon={<UserDeleteOutlined/>}
            onClick={()=>handleLeftRoom()}
            >Thoát phòng</Button>
            <Avatar.Group size='small' maxCount={2}>
                {members.map((member)=>
                <Tooltip title={member.displayName} key={member.id} >
                    <Avatar src={member.photoURL}>
                        {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                </Tooltip>
                )}
            </Avatar.Group>
        </ButtonGroupStyled>

        </HeaderStyled>
        <ContentStyled>
            <MessageListStyled ref={messageListRef}>
                {messages ? messages.map((mess)=><Message text={mess.text} photoURL={mess.photoURL} key={mess.id}
                displayName={mess.displayName} createAt={formatDate(mess?.createAt?.seconds)}></Message> ) 
                : <></>}
            </MessageListStyled>
                <InputChat></InputChat>
            </ContentStyled>
            </> : <Alert message="Chọn phòng đi bạn ơi" type='info' showIcon closable></Alert>
            }
        </WrapperStyled>
    );
}

export default ChatWindow;