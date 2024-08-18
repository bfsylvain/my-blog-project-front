import PropTypes from "prop-types";
import Cookies from "js-cookie";
import "./navbar.scss";
import axios from "axios";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState } from "react";
import { UserInfo } from "../../types/UserInfo.type.tsx";

type NavbarProps = {
  userInfo: UserInfo
}
export default function Navbar({ userInfo }: NavbarProps) {
  const [openNav, setOpenNav] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const disconnect = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/logOut`);
      if (response) {
        Cookies.remove("jwt");
        window.location.reload();
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <>
      <MDBNavbar expand="lg" light className="light-orange">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Taste & Travel</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/">
                  Accueil
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem> 
                <MDBNavbarLink href="/articles">Articles</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {userInfo ? <MDBNavbarLink onClick={disconnect}>Déconnexion</MDBNavbarLink>: <MDBNavbarLink href="/connexion">Connexion</MDBNavbarLink>}
              </MDBNavbarItem>
              <MDBNavbarItem> 
                <MDBNavbarLink href="/counter">Counter</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      
    </>
  );
}

Navbar.propTypes = {
  userInfo: PropTypes.object,
};
