import React, { useEffect } from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  z-index: 10;
  background-color: #3f220f;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
`;

const Logo = styled.h1`
  font-family: "Jim Nightshade", cursive;
  line-height: 60px;
  margin: 0;
  display: inline-block;
  cursor: pointer;
  color: white;
  user-select: none;
`;

const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  height: 60px;
  flex-direction: row;
  margin-left: 20px;
`;

const Link = styled.li`
  user-select: none;
  cursor: pointer;
  color: white;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
  margin-right: 5px;
  line-height: 60px;
  background-color: ${props => (props.active ? "#FFFFFF30" : "transparent")};
  font-family: "Montserrat Alternates", sans-serif;
`;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Collapsable = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export default function NavigationBar(props) {
  const navigate = route => {
    props.history.push(route);
  };

  const isLinkActive = pathName => props.location.pathname === pathName;

  return (
    <NavBarContainer>
      <Logo onClick={() => navigate("/")}>Leathery</Logo>
      <Collapsable>
        <Side>
          <LinkList>
            <Link
              onClick={() => navigate("/nosotros")}
              active={isLinkActive("/nosotros")}
            >
              Nosotros
            </Link>
            <Link
              onClick={() => navigate("/productos")}
              active={isLinkActive("/productos")}
            >
              Productos
            </Link>
          </LinkList>
        </Side>
        <Side>
          <LinkList>
            <Link
              onClick={() => navigate("/login")}
              active={isLinkActive("/login")}
            >
              Iniciar sesión
            </Link>
            <Link
              onClick={() => navigate("/signup")}
              active={isLinkActive("/signup")}
            >
              Registrarse
            </Link>
          </LinkList>
        </Side>
      </Collapsable>
    </NavBarContainer>
  );
}
