
import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import logo from "../../assets/logoNav.webp"
import { Sidebar } from "./SideBar"

const Nav = styled.nav`
background-color:#259d07;
height:65px;
z-index:1200;
justify-content:center;
position:fixed;
display:flex;
margin-bottom:20px;
top:0;
width:100%;
`
export const Img = styled.img`
width: 120px;
z-index:0;
`
export const Item = styled.div`
margin-left:200px;
margin-top:60px;

`
export const NavBar = () => {

    return (
        <Fragment>
            <Nav> <Img src={logo} /></Nav>
            <Sidebar />
            <Item>
                <Outlet />
            </Item>

        </Fragment>
    )
}