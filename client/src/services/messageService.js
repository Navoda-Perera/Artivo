import api from './api';

export const createMessage = (messageData) => api.post('/messages', messageData);
export const getMessages = () => api.get('/messages');
export const updateMessageStatus = (id, status) => api.put(`/messages/${id}`, { status });
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
