const axios = require('axios');
const server = 'localhost:4000/api';

class FundamorClient {
    static async getFundamorToken() {
        try {
            const options = {
                method: 'POST',
                url: `${ server }/auth/token`,
                data: {
                    "correo":"tester@gmail.com",
                    "contrasenia":"hola"
                }
            };
            const res = await axios(options);
            console.log(res)
            return res;
        } catch (e) {
            console.error('ERROR: ' + e.message);
            return {
                error: e.message
            };
        }
    }

    static async listAnimals(token) {
        try {
            const options = {
                headers: {'x-auth-token':token},
                method: 'GET',
                url: `${ server }/animals`,
            };
            const res = await axios(options);
            console.log(res)
            return res;
        } catch (e) {
            console.error('ERROR: ' + e.message);
            return {
                error: e.message
            };
        }
    }
}
