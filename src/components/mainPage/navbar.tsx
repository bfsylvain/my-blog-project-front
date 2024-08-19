import Cookies from "js-cookie";
import "./navbar.scss";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { logoutUser } from "../../app/features/auth/authSlice.ts";
import { useLogoutMutation } from "../../app/features/api/authApi.ts";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.id);

  const disconnectRTK = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
    } catch (err) {
      console.error(err);
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
                {userId ? (
                  <MDBNavbarLink onClick={disconnectRTK}>
                    Déconnexion
                  </MDBNavbarLink>
                ) : (
                  <MDBNavbarLink href="/connexion">Connexion</MDBNavbarLink>
                )}
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

