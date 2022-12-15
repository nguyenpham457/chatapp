import { Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import addDocument from '../../firebase/services';



const FormStyled = styled(Form)`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 2px;
     border: 1px solid rgb(230,230,230);
     border-radius: 2px;
    
     .ant-form-item {
        flex: 1;
        margin-bottom: 0;
     }
`
function InputChat(props) {
    const {user } = useContext(AuthContext);
    const {selectedRoom} = useContext(AppContext)
    const [inputValue, setInputValue] = useState('');
    const [ form] = Form.useForm();
    
    const handleInputChange = (e)=>{
        setInputValue(e.target.value)
    }
    const handleOnSubmit = ()=>{
        addDocument('messages',{
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            roomId: selectedRoom.id
        })
        form.resetFields(['message'])
    }

    return (
        <FormStyled form={form}>
        <Form.Item name='message'>
            <Input bordered={false} autoComplete='off' placeholder='Nhập tin nhắn ...'
            onChange={handleInputChange}
            onPressEnter= {handleOnSubmit}
            ></Input>
        </Form.Item>
    </FormStyled>
    );
}

export default InputChat;