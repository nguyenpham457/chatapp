import { Col, Row } from 'antd';
import React from 'react';
import RoomList from './RoomList';
import UserInfo from './UserInfo';
import styled from 'styled-components';

const SidebarStyled = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;

function Sidebar(props) {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}><UserInfo/></Col>
                <Col span={24}><RoomList/></Col>
            </Row>
        </SidebarStyled>
    );
}

export default Sidebar;