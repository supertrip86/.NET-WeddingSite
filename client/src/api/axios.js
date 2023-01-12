import axios from "axios";

const axiosPrivate = axios.create();

axiosPrivate.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');

    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
});

axiosPrivate.interceptors.response.use(response => {
    return response;
}, error => {
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("accessToken");

    return Promise.reject(error);
});

export default axiosPrivate;