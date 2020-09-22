import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'X-Frame-Options': 'DENY',
  }
});
