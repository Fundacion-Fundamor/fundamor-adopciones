import axiosClient from "./axios";

/**Permite configurar el token mendiante la instancia de axios,
 * 
 * 
 * @param {*} token 
 */
const authToken = token => {
    if (token) {
        axiosClient.defaults.headers.common["x-auth-token"] = token;
    } else {

        delete axiosClient.defaults.headers.common["x-auth-token"];
    }

}


export default authToken;