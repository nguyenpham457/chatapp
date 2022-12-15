import React from 'react';
import {Row,Col, Button} from 'antd';
import Title from 'antd/es/typography/Title';
import {auth} from '../../firebase/config';
import { FacebookAuthProvider,signInWithPopup,getAdditionalUserInfo } from "firebase/auth";
import { addDocument, generateKeywords } from '../../firebase/services';
const fbProvider = new FacebookAuthProvider();

function Login() {
    const handleFbLogin = async ()=>{
       const data = await signInWithPopup(auth, fbProvider);
       const {user} = data;
       const {isNewUser,providerId} = getAdditionalUserInfo(data);
       if(isNewUser){
            await addDocument("users",{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerID: providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            })   
       }
    }


    return (
           <Row justify='center' style={{ height: 800 }}>
                <Col span={6}>
                    <Title style={{textAlign:'center'}} level={3}>Login</Title>
           
                <Button  style={{ width: '100%', marginBottom: 5 }} type="default">
                    Đăng nhập bằng Google
                </Button>
                <Button style={{width:'100%'}} type="primary" onClick={handleFbLogin}>
                    Đăng nhập bằng FaceBook
                </Button>
                </Col>
            </Row>
    );
}

export default Login;