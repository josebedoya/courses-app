import { API } from '../api';

const setAuthToken = (token: string | boolean) => {
  if (token) {
    API.defaults.headers.common['authorization'] = token;
  } else {
    delete API.defaults.headers.common['authorization'];
  }
};

export default setAuthToken;
