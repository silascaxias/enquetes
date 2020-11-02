import {create} from 'apisauce';

const api = create({
  baseURL: 'http://enqueteapi.luxfacta.com',
  headers: {Accept: 'application/json'},
});

api.axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
