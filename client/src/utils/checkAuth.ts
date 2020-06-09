import jwt_decode from 'jwt-decode';
import setAuthToken from "./setAuthToken";
import { setLoggedUser, logoutUser } from '../containers/LoginPage/loginSlice';
import store from './../app/store';

const checkAuth = () => {
  if (localStorage.token) {
    const token = localStorage.token;
    setAuthToken(token);
    const decoded: any = jwt_decode(token);
    store.dispatch(setLoggedUser(decoded));
    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/';
    }
  }
}

export default checkAuth;