import React from 'react';
import { Row,Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';


function ChatRoom(props) {
    return (
            <Row style={{ height: '100vh' }}>
                <Col span={6}><Sidebar></Sidebar></Col>
                <Col span={18}><ChatWindow></ChatWindow></Col>
            </Row>
    );
}

export default ChatRoom;