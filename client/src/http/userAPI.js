import axios from 'axios';

export const getUsers = async () => {
  const { data } = await axios.get('http://localhost:5000/chat/user/users');
  return data;
};

export const getMessagesReceived = async (user) => {
  const { data } = await axios.post('http://localhost:5000/chat/user/messages/received', { user });
  return data;
};

export const getMessagesSended = async (user) => {
  const { data } = await axios.post('http://localhost:5000/chat/user/messages/sended', { user });
  return data;
};
