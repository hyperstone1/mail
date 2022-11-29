import React, { useState, useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { simulateLoading } from '../utils/loading';
import Context from '../utils/context/Context';

const FormModal = ({ show, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const { users, user, receiverName, setReceiverName } = useContext(Context);

  const onChangeReceiver = (e) => {
    setReceiverName(e.target.value);
    console.log(receiverName);
  };

  useEffect(() => {
    console.log(isLoading);
    if (isLoading) {
      simulateLoading().then(() => {
        setIsLoading(false);
        handleClose();
        Swal.fire('Сообщение отправлено.');
      });
    }
  }, [isLoading]);

  async function handleSubmitMessage(e) {
    e.preventDefault();
    const message = await axios.post('http://localhost:5000/chat/user/send/message', {
      nameSender: user,
      receiverName,
      messageBody,
      title,
    });
    setIsLoading(true);
    console.log(message);
    console.log(users[0].name);
  }
  return (
    users && (
      <Modal
        centered
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header id="contained-modal-title-vcenter" closeButton>
          <Modal.Title>Новое сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Выберите получателя</Form.Label>
              <Form.Select
                onChange={onChangeReceiver}
                value={receiverName}
                aria-label="Default select example"
                disabled={isLoading ? true : false}
              >
                {users.map((item, id) => (
                  <option key={id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Напишите тему письма</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="email"
                placeholder="Дедлайн близко..."
                autoFocus
                disabled={isLoading ? true : false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Сообщение</Form.Label>
              <Form.Control
                onChange={(e) => setMessageBody(e.target.value)}
                value={messageBody}
                as="textarea"
                rows={3}
                disabled={isLoading ? true : false}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading ? true : false}>
            Закрыть
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={(e) => handleSubmitMessage(e)}
            disabled={isLoading ? true : false}
          >
            {isLoading ? <Spinner animation="border" /> : 'Отправить'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default FormModal;
