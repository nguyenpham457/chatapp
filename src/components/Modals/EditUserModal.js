import { Modal,Form, Input } from 'antd';
import {  doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../firebase/config';
import { generateKeywords } from '../../firebase/services'


function EditUserModal() {
    const {isEditUserVisible,setIsEditUserVisible} = useContext(AppContext)
    const {user ,setUser} =useContext(AuthContext)
    const [form] = Form.useForm();

    const handleOk = async()=>{
        const data = form.getFieldsValue()
        const userRef = doc(db,'users',user.docId);

        updateDoc(userRef,{
            displayName: data.displayName || user.displayName,
            photoURL: data.photoURL || user.photoURL,
            keywords: generateKeywords((data.displayName||user.displayName).toLowerCase()),
        })
        setUser({
            ...user,
            displayName: data.displayName || user.displayName,
            photoURL: data.photoURL || user.photoURL,
        })
        form.resetFields()
        setIsEditUserVisible(false);
    }
    const handleCancel = ()=>{
        form.resetFields()
        setIsEditUserVisible(false)
    }

    return (
        <div>
            <Modal title="Sửa thông tin"
            open= {isEditUserVisible}
            onOk={handleOk}
            onCancel={ handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Nhập tên mới đi bạn" name='displayName'>
                        <Input placeholder='Nhập tên mới đi bạn'>
                        </Input>
                    </Form.Item>
                    <Form.Item label="Nhập link ảnh đi bạn" name='photoURL'>
                        <Input placeholder='Nhập link ảnh đi bạn'>
                        </Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EditUserModal;