export const handleResponseError = (error) => {

    // console.log(error.response.status);
    if (error.response) {
        if (error.response.status !== 500) {

            if (error.response.status === 400) {
                return "Ha ocurrido un error realizando la petición, por favor contacte al desarrollador"
            }else if(error.response.status === 401){
                return error.response.data.message

            }
        }

    }
    return "Ha ocurrido un error contactando al servidor, por favor intente mas tarde"
}
