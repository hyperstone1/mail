import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { BiEditAlt } from 'react-icons/bi';
import FormModal from './FormModal';
import Context from '../utils/context/Context';

const Menu = () => {
  const [show, setShow] = useState(false);
  const {
    showIncoming,
    showOutgoing,
    setShowIncoming,
    setShowOutgoing,
    messagesReceived,
    messagesSended,
  } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowIncoming = () => {
    setShowIncoming(true);
    setShowOutgoing(false);
  };
  const handleShowOutgoing = () => {
    setShowIncoming(false);
    setShowOutgoing(true);
  };

  return (
    <div>
      <FormModal show={show} handleClose={handleClose} />
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            className={showIncoming ? 'active' : ''}
            onClick={handleShowIncoming}
            eventKey="link-1"
          >
            Входящие
            <Badge bg={showIncoming ? 'primary' : 'secondary'}>
              {messagesReceived && messagesReceived.length}
            </Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={showOutgoing ? 'active' : ''}
            onClick={handleShowOutgoing}
            eventKey="link-2"
          >
            Отправленные
            <Badge bg={showOutgoing ? 'primary' : 'secondary'}>
              {messagesSended && messagesSended.length}
            </Badge>
          </Nav.Link>
        </Nav.Item>
        <Button variant="primary" onClick={handleShow}>
          <BiEditAlt /> Написать
        </Button>
      </Nav>
    </div>
  );
};

export default Menu;
