import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../security/Autenticacao';

function MenuPrivado() {
    const usuario = getUsuario();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" to="/privado">
                        Culturas Agrícolas
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/privado">
                                Home
                            </NavLink>

                            {usuario && (
                                <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" to="plantas">
                                        Plantas
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="culturas">
                                        Culturas
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="manejos">
                                        Manejos
                                    </NavLink>
                                </NavDropdown>
                            )}

                            <NavLink className="nav-link" to="sobre">
                                Sobre...
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown
                            title={
                                usuario
                                    ? `Usuário: ${usuario.nome_user || usuario.nome || usuario.e_mail}`
                                    : "Usuário"
                            }
                            id="user-nav-dropdown"
                        >
                            {usuario ? (
                                <>
                                    <NavLink className="dropdown-item" to="meusdados">
                                        Meus Dados
                                    </NavLink>
                                    <NavDropdown.Divider />
                                    <NavLink
                                        className="dropdown-item"
                                        to="/"
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </NavLink>
                                </>
                            ) : (
                                <NavLink className="dropdown-item" to="/login">
                                    Login
                                </NavLink>
                            )}
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}

export default MenuPrivado;
