import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = (data) => api.post("/api/user/register", data);
export const loginUser = (data) => api.post("/api/user/login", data);

export const getEvents = (params = {}) => api.get("/api/event", { params });
export const getEventDetail = (id) => api.get(`/api/event/${id}`);
export const createEvent = (data, token) =>
  api.post("/api/event", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateEvent = (id, data, token) =>
  api.put(`/api/event/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteEvent = (id, token) =>
  api.delete(`/api/event/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const enrollToEvent = (id, token) =>
  api.post(`/api/event/${id}/enroll`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const unenrollFromEvent = (id, token) =>
  api.post(`/api/event/${id}/unenroll`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getEventLocations = (token) =>
  api.get("/api/event-location", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getEventLocationDetail = (id, token) =>
  api.get(`/api/event-location/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createEventLocation = (data, token) =>
  api.post("/api/event-location", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateEventLocation = (id, data, token) =>
  api.put(`/api/event-location/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteEventLocation = (id, token) =>
  api.delete(`/api/event-location/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;