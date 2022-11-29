import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { MdLogout } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import Context from '../utils/context/Context';

const Header = () => {
  const { user, setUser } = useContext(Context);

  const handleExit = () => {
    setUser('');
    localStorage.clear();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <FiUser />
          {user}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav>
          <Nav.Link onClick={handleExit} eventKey={2}>
            <MdLogout /> Выйти
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
