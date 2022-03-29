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


export const  calculateAnimalAge = dateOfBirth => {

    if (!dateOfBirth || isNaN(new Date(dateOfBirth))) return;
    const today = new Date();
    const dateNac = new Date(dateOfBirth);
    if (today - dateNac < 0) return;
    let days = today.getUTCDate() - dateNac.getUTCDate();
    let months = today.getUTCMonth() - dateNac.getUTCMonth();
    let years = today.getUTCFullYear() - dateNac.getUTCFullYear();
    if (days < 0) {
        months--;
        days = 30 + days;
    }
    if (months < 0) {
        years--;
        months = 12 + months;
    }

    let inMonths = months + (years * 12);



    if (inMonths === 0 || inMonths === 1) {
        return "1 Mes";
    }

    return inMonths + " Meses";

};
