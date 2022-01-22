/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { Alert, Avatar, Box, Card, CardActions, CardContent, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import { IoPawOutline } from 'react-icons/io5';
import { LoadingButton } from '@mui/lab';

function Login(props) {

	const { login, authenticated, message, loading, authenticatedUser } = useContext(AuthContext);

	const [credentials, setCredentials] = useState({
		email: "luzmari0987@gmail.com",
		password: "12345678"
	});

	const [errors, setErrors] = useState({
		password: null,
		email: null
	})

	const onSubmit = async () => {
		//valida las credenciales
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (credentials.email === "" || re.test(credentials.email) === false) {
			setErrors({ ...errors, email: true })
		} else if (credentials.password === "") {
			setErrors({ ...errors, password: true })
		} else {


			login(credentials.email, credentials.password);

		}
	}

	useEffect(() => {
		authenticatedUser()
	}, [])

	useEffect(() => {

		if (authenticated) {
			props.history.push("/dashboard");
		}

	}, [authenticated, message, props.history])

	return (

		<Box sx={{
			minHeight: "100vh", background: "linear-gradient(0deg, rgba(255,138,75,1) 0%, rgba(255,125,58,1) 100%)",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontFamily: "Nunito",
			flexDirection:"column"
			
		}}>

			<Card
				variant="outlined"
				sx={{
					width: {
						md: "400px",
						sm: "400px",
						xs: "95%"

					},
					marginTop:"10px",
					padding: "24px 15px",
					borderRadius: "12px",

				}}>


				<Typography sx={{ fontFamily: "Nunito", fontSize: "22px", fontWeight: "900", textAlign: "center", mb: 2 }}>Ingresar</Typography>

				<Stack justifyContent={"center"} alignItems={"center"} mb={2}>
					<Avatar alt="Travis Howard" src="/images/imagotipo.png" sx={{ width: 95, height: 95, borderRadius: 0 }} />
				</Stack>
				<Typography sx={{ fontFamily: "Nunito", fontSize: "14px", fontWeight: "600", textAlign: "center", mb: 3 }}>Solo personal autorizado de la Fundación Fundamor</Typography>

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


					<TextField label="Contraseña" fullWidth
						variant="outlined"
						error={errors.password}
						sx={{ background: "#fff", mt: 3 }}
						InputProps={{ type: "password" }}
						InputLabelProps={{ style: { background: "#fff", paddingLeft: "5px", paddingRight: "5px" } }}
						onBlur={(event) => {
							setCredentials({ ...credentials, "password": event.target.value });
							setErrors({ ...errors, password: false });
						}}
						inputProps={{ maxLength: 100 }}
					/>
					{errors.password ? <FormHelperText error={errors.password} >Debe ingresar una contraseña</FormHelperText> : null}

					<Link style={{ marginTop: 18, textAlign: "center" }} to="/passwordReset">¿Olvidó su contraseña?</Link>

					{message && message.showIn === "loginForm" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935" }} >{message.text}</Alert>}

				</CardContent>
				<CardActions sx={{ mt: 3 }}>



					<LoadingButton loading={loading}
						variant="contained"
						endIcon={<IoPawOutline style={{ transform: "rotate(90deg)" }} />}
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
						Iniciar sesión
					</LoadingButton>
				</CardActions>
			</Card>
			<Typography sx={{ fontFamily: "Nunito", color: "#dedede", fontSize: "14px", fontWeight: "600", textAlign: "center", mt: 5, marginBottom: "10px", }}>Copyright &copy; {new Date().getFullYear()} Fundamor Calarcá</Typography>

		</Box>

	)
}

export default Login
