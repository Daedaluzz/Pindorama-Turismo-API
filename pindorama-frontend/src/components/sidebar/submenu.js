import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
display: flex;
color: #F2F2F2;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;
&:hover {
    color: #F4CA30;
    background: #F2F2F21a;
    border-left: 4px solid #F2F2F2;
    cursor: pointer;
}
`;
const SidebarLabel = styled.span`
margin-left: 16px;
`;
const DropdownLink = styled(Link)`
color:#222426;
background: #ffffff8a;
height: 50px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
font-size: 16px;
&:hover {
    color: #222426;
    background: #F2F2F2;
    cursor: pointer;
}
`;


export default function SubMenu({ item }) {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)

    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {

                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>

                    </DropdownLink>
                )
            })}
        </>
    )
}
