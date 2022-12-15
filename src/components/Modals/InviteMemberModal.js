import { Modal,Form, Select, Avatar } from 'antd';
import { collection, doc, limit, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import _ from 'lodash';
import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { db } from '../../firebase/config';


function InviteMemberModal() {
    const {isInviteMemberVisible,setIsInviteMemberVisible,selectedRoom} =useContext(AppContext)
    const [inviteMember,setInviteMember] = useState([])
    const [options, setOptions] = useState([]);
    const [form] = Form.useForm();

    const handleSearchMembers = (search,currentMembers) => {      
        let collectionRef = collection(db, 'users');
        let queryRef = query(collectionRef,where('keywords','array-contains',search?.toLowerCase()),limit(10))
        onSnapshot(queryRef,(snapshot) => {
            const data = snapshot.docs.map(doc =>({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                
            })).filter((opt)=> !currentMembers.includes(opt.value))
        setOptions(data)});
    }

    const debounceOnChangeSearch = useRef(_.debounce(handleSearchMembers,1000)).current
    const onChangeSearch= (search) => {
        debounceOnChangeSearch(search,selectedRoom.members)
    }
    const handleOk = ()=>{
        const roomRef = doc(db,'rooms',selectedRoom.id);
        updateDoc(roomRef,{
            members: [...selectedRoom.members,...inviteMember]
        })
        setInviteMember([])
        setOptions([])
        form.resetFields()
        setIsInviteMemberVisible(false);
    }
    const handleCancel = ()=>{
        setInviteMember([])
        setOptions([])
        form.resetFields()
        setIsInviteMemberVisible(false)
    }

    return (
        <div>
            <Modal title="Mời thành viên"
            open= {isInviteMemberVisible}
            onOk={handleOk}
            onCancel={ handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Select
                    style={{ width: '100%' }}
                    value={inviteMember}
                    onSearch={onChangeSearch}
                    onChange={newValue => setInviteMember(newValue)}
                    mode='multiple'
                    name='search-user'
                    placeholder='Nhập tên thành viên'
                    filterOption={false}
                    >{
                        options.map((option) => 
                            <Select.Option key={option.value}  value={option.value} title={option.label}>
                                <Avatar size='small' src={option.photoURL}>
                                {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                {option.label}
                            </Select.Option>
                        )
                    }
                    </Select>
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;