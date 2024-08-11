// import { Link } from "react-router-dom";
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

export default function Navbar({ userInfo }) {
  const [openNav, setOpenNav] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const disconnect = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/logOut`);
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
