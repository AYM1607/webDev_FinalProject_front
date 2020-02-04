import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

import cart from "../lib/shoppingCart";
import auth from "../lib/auth";

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
  align-items: center;
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
  height: auto;
  flex-direction: column;
  margin-left: 20px;

  @media (min-width: 992px) {
    & {
      flex-direction: row;
      height: 60px;
    }
  }
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
  text-align: center;
  background-color: ${props => (props.active ? "#FFFFFF30" : "transparent")};
  font-family: "Montserrat Alternates", sans-serif;
`;

const Icon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
  margin-left: auto;

  @media (min-width: 992px) {
    & {
      margin: 0;
    }
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 992px) {
    & {
      display: none;
    }
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HorizontalSpacer = styled.div`
  margin-left: auto;
`;

const Collapsable = styled.div`
  margin: 0;
  top: 60px;
  left: 0;
  position: fixed;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  z-index: 20;
  width: 100%;
  transform-origin: center top;
  transform: scaleY(0);
  background-color: #3f220fa0;
  transition: transform 0.2s ease-in-out;
  visibility: ${props => (props.show ? "visible" : "hidden")};
  transform: ${props => (props.show ? "scaleY(1)" : "scaleY(0)")};

  @media (min-width: 992px) {
    visibility: visible;
    transition: none;
    transform: scaleY(1);
    position: static;
    flex-direction: row;
    background-color: transparent;
  }
`;

export default function NavigationBar(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigate = route => {
    props.history.push(route);
    setShowMenu(false);
  };

  const isLinkActive = pathName => props.location.pathname === pathName;

  const handleLogout = () => {
    auth.logOut();
    props.history.push("/");
  };

  return (
    <NavBarContainer>
      <Logo onClick={() => navigate("/")}>Leathery</Logo>
      <Collapsable show={showMenu}>
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
            {props.isAuthenticated ? (
              <>
                <Link onClick={() => handleLogout()}>Cerrar sesión</Link>
                <Link
                  onClick={() => navigate("/ordenes")}
                  active={isLinkActive("/ordenes")}
                >
                  Mis ordenes
                </Link>
                {props.isAdmin ? (
                  <Link
                    onClick={() => navigate("/admin")}
                    active={isLinkActive("/admin")}
                  >
                    Admin
                  </Link>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                {" "}
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
                </Link>{" "}
              </>
            )}
          </LinkList>
        </Side>
      </Collapsable>

      {props.location.pathname !== "/pagar" ? (
        <Icon
          icon={faShoppingCart}
          color="white"
          size="2x"
          onClick={() => cart.openCart()}
        />
      ) : (
        <HorizontalSpacer />
      )}
      <MenuIcon
        icon={faBars}
        color="white"
        size="2x"
        onClick={() => toggleShowMenu()}
      />
    </NavBarContainer>
  );
}
