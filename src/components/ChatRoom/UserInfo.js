import { Avatar, Button, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82,38,83);
    .username{
        color: white;
        margin-left:5px;
    }
`

function UserInfo() {
    const {setIsEditUserVisible} = useContext(AppContext)
    
    const {user :{
        displayName,
        photoURL
    }} = useContext(AuthContext)


    return (
        <WrapperStyled>
            <Row  onClick={()=>setIsEditUserVisible(true)}>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='username'>{displayName}</Typography.Text>
            </Row>
            <Button ghost onClick={()=>auth.signOut()}> Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;