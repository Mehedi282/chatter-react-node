import axios from 'axios';
import constants from './constants';

const instance = axios.create({baseURL: constants.base_url + '/api/v1'});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.setToken = (accessToken) => {
  instance.defaults.headers.Authorization = `Token ${accessToken}`;
};

export default instance;
