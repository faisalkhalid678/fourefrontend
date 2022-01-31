import axios from 'axios';
export const Axios = axios.create({
  baseURL: 'http://localhost/flight-api/api',
   //baseURL: 'https://flightapis.foure.org/api/',
  // headers: { 'Content-Type': 'application/json'},
  headers: { 'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/json'},
});

export default Axios;
