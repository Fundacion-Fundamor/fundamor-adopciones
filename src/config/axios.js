import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000
});


/**Interceptador de axios,
 * permite cerrar la sesion y eliminar el token de localstorage si alguna respuesta cotiene el codigo 
 * 401 (no autorizado)
 * 
 */
axiosClient.interceptors.response.use(function (response) {

    return response;

}, function (error) {

    const { data, status } = error.response;

    if (status === 401) {
        if (data.message.includes("expirado")) {
            localStorage.removeItem("token");
            setTimeout(() => { window.location.reload(false); }, 5000);
        }
    }

    return Promise.reject(error);
});

export default axiosClient;