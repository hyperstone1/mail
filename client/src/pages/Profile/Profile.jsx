import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { getMessagesReceived, getMessagesSended, getUsers } from '../../http/userAPI';
import moment from 'moment';
import Accordion from 'react-bootstrap/Accordion';
import './index.scss';
import Swal from 'sweetalert2';
import { simulateLoading } from '../../utils/loading';
import Menu from '../../components/Menu';

import Header from '../../components/Header';
import Context from '../../utils/context/Context';

const Profile = () => {
  const name = localStorage.getItem('name');
  const [user, setUser] = useState(name);
  const [users, setUsers] = useState();
  const [showIncoming, setShowIncoming] = useState(true);
  const [showOutgoing, setShowOutgoing] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [messagesReceived, setMessagesReceived] = useState();
  const [messagesSended, setMessagesSended] = useState();

  useEffect(() => {
    fetchData();
    console.log(users);
  }, []);

  useEffect(() => {
    getMessagesReceived(user).then((data) => {
      setMessagesReceived(data);
      console.log(data);
    });

    getMessagesSended(user).then((data) => {
      setMessagesSended(data);
      console.log(data);
    });
  }, [showOutgoing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (messagesReceived) {
        getMessagesReceived(user).then((data) => {
          if (data.length !== messagesReceived.length) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Вам пришло новое сообщение',
              showConfirmButton: false,
              timer: 1500,
            });
            setMessagesReceived(data);
          }
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [messagesReceived]);

  async function fetchData() {
    getUsers().then((data) => {
      setUsers(data);
      console.log(data);
      setReceiverName(data[0].name);
    });
  }

  return user ? (
    <Context.Provider
      value={{
        user,
        setUser,
        users,
        showIncoming,
        showOutgoing,
        receiverName,
        setReceiverName,
        messagesReceived,
        messagesSended,
        setShowIncoming,
        setShowOutgoing,
      }}
    >
      <div>
        <Header />

        <div className="messages">
          <div className="all_messages">
            <Menu
              receiverName={receiverName}
              showIncoming={showIncoming}
              showOutgoing={showOutgoing}
              setShowIncoming={setShowIncoming}
              setShowOutgoing={setShowOutgoing}
              messagesReceived={messagesReceived}
              messagesSended={messagesSended}
            />

            {messagesReceived && showIncoming && (
              <Accordion defaultActiveKey="0">
                {messagesReceived.map((item, id) => (
                  <div key={id}>
                    <Accordion.Item eventKey={id}>
                      <Accordion.Header>
                        <div className="message">
                          <div className="sender mail">
                            <b>From:</b> {item.nameSender}
                          </div>
                          <div className="title mail" style={{ textAlign: 'center' }}>
                            <b>Title:</b> {item.title}
                          </div>
                          <div className="time mail">
                            <b>Time:</b> {moment(item.createdAt).format(`HH:mm:ss`)}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body style={{ textAlign: 'center' }}>
                        {item.messageBody}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            )}
            {messagesSended && showOutgoing && (
              <Accordion defaultActiveKey="0">
                {messagesSended.map((item, id) => (
                  <div key={id}>
                    <Accordion.Item eventKey={id}>
                      <Accordion.Header>
                        <div className="message">
                          <div className="sender mail">
                            <b>To:</b> {item.receiverName}
                          </div>
                          <div className="title mail" style={{ textAlign: 'center' }}>
                            <b>Title:</b> {item.title}
                          </div>
                          <div className="time mail">
                            <b>Time:</b> {moment(item.createdAt).format(`HH:mm:ss`)}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body style={{ textAlign: 'center' }}>
                        {item.messageBody}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  ) : (
    <Navigate to="/login" />
  );
};

export default Profile;
