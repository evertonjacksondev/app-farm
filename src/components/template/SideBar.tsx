import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "../atoms/Icon";



const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 65px; /* Alinha com o NavBar */
  left: 0;
  z-index:1200;
  width: ${(props: any) => (props.isOpen ? "200px" : "0")};
  height: 100%;
  background-color: #2c3e50;
  overflow-x: hidden;
  transition: 0.3s;
  box-shadow: ${(props: any) => (props.isOpen ? "2px 0 5px rgba(0, 0, 0, 0.5)" : "none")};
`;

const SidebarContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top:20px;
`;

const SidebarItem = styled.li`
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #34495e;

  &:hover {
    background-color: #34495e;
    cursor: pointer;
  }
`;

const SidebarLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  display: block;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 15px;
  margin-left:15px;
  margin-top:20px;
  cursor: pointer;
  z-index: 2000;
  position:fixed;
  top:0;
`;

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? <Icon name="closed" /> : <Icon name="list" />}
      </ToggleButton>

      <SidebarContainer isOpen={isOpen}>
        <SidebarContent>
        <SidebarLink to="/produtor">
            <SidebarItem>
              Produtor
            </SidebarItem>
          </SidebarLink>
          <SidebarLink to="/agriculture">
            <SidebarItem>
              Cultivos
            </SidebarItem>
          </SidebarLink>
          <SidebarLink to="/farm">
            <SidebarItem >
              Fazendas
            </SidebarItem>
          </SidebarLink>
         
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};
