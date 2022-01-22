import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000
});


axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // console.log(error)
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