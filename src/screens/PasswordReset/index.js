/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useContext, useState, useEffect } from 'react'
import { Alert, Avatar, Card, CardActions, CardContent, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import { IoPawOutline } from 'react-icons/io5';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import NavbarComponent from '../../components/Navbar';



/**Formulario de recuperación de contraseña
 * 
 * @param {*} props 
 * @returns 
 */
function PasswordReset(props) {


	return (
		<div>
			<NavbarComponent active='passwordReset' />
			<PasswordResetForm {...props} />
		</div>
	)
}



const PasswordResetForm = (props) => {

	const { authenticated, message, loading, authenticatedUser, resetPassword } = useContext(AuthContext);

	const [credentials, setCredentials] = useState({
		email: ""
	});

	const [errors, setErrors] = useState({
		email: null
	})

	const onSubmit = async () => {
		//valida las credenciales
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (credentials.email === "" || re.test(credentials.email) === false) {
			setErrors({ ...errors, email: true })
		} else {
			resetPassword(credentials.email);
		}
	}

	useEffect(() => {
		authenticatedUser();
	}, [])

	useEffect(() => {

		if (authenticated) {
			props.history.push("/dashboard");
		}

	}, [authenticated, message, props.history])

	return (

		<section style={{ background: "rgb(248, 245, 240)", height: "100vh" }}>
			<div className='container '>
				<div className='row py-5  mt-5 justify-content-center'>

					<Card
						variant="outlined"
						sx={{
							width: {
								md: "400px",
								sm: "400px",
								xs: "95%"

							},
							padding: "24px 15px",
							borderRadius: "12px",
							marginTop: "30px",
						}}>


						<Typography sx={{ fontFamily: "Nunito", fontSize: "22px", fontWeight: "900", textAlign: "center", mb: 2 }}>Recuperar contraseña</Typography>

						<Stack justifyContent={"center"} alignItems={"center"} mb={2}>
							<Avatar alt="Travis Howard" src="/images/imagotipo.png" sx={{ width: 95, height: 95, borderRadius: 0 }} />
						</Stack>
						<Typography sx={{ fontFamily: "Nunito", fontSize: "14px", fontWeight: "600", textAlign: "center", mb: 3 }}>Por favor ingrese el correo con el que se encuentra registrado en la plataforma</Typography>
						<form onSubmit={(e) => {
							e.preventDefault();
							if (!loading) {
								onSubmit()
							}
						}}>
							<CardContent sx={{ justifyContent: "center", display: "flex", flexDirection: "column", }}>
								<TextField label="Correo" fullWidth
									variant="outlined"
									error={errors.email}
									sx={{ background: "#fff" }}
									InputLabelProps={{ style: { background: "#fff", paddingLeft: "5px", paddingRight: "5px", } }}
									onBlur={(event) => {
										setCredentials({ ...credentials, "email": event.target.value });
										setErrors({ ...errors, email: false });
									}}
									inputProps={{ maxLength: 100 }}
								/>
								{errors.email ? <FormHelperText error={errors.email} >Debe ingresar un correo válido</FormHelperText> : null}




								{message && message.showIn === "recoveryForm" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935" }} >{message.text}</Alert>}

							</CardContent>
							<CardActions sx={{ mt: 3, flexDirection: "column" }}>



								<LoadingButton loading={loading}
									variant="contained"
									endIcon={<IoPawOutline />}
									type="submit"
									sx={{
										"& .MuiLoadingButton-loadingIndicator": {
											color: "white"
										}
									}}
									style={{ width: "100%", fontFamily: "Nunito", fontWeight: "900", borderRadius: 12, backgroundColor: "#de6426" }}
									onClick={() => {

										if (!loading) {
											onSubmit()

										}
									}}


								>
									Enviar
								</LoadingButton>

								<Link style={{ marginTop: 18, textAlign: "center" }} to="/login">Ir atrás</Link>

							</CardActions>
						</form>
					</Card>

					<Typography sx={{ fontFamily: "Nunito", color: "#0a303a", fontSize: "14px", fontWeight: "600", textAlign: "center", mt: 5 }}>Copyright &copy; {new Date().getFullYear()} Fundamor Calarcá</Typography>

				</div>
			</div>
		</section>

	)
}

export default PasswordReset
