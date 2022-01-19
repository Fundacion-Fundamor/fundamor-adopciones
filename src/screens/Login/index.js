import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import { IoPawOutline } from 'react-icons/io5';
import { LoadingButton } from '@mui/lab';

function Login(props) {

	const { login, authenticated, message, loading } = useContext(AuthContext);

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
			setErrors({ ...errors, ["email"]: true })
		} else if (credentials.password === "") {
			setErrors({ ...errors, ["password"]: true })
		} else {


			login(credentials.email, credentials.password);

		}
	}


	useEffect(() => {

		if (authenticated) {
			props.history.push("/gallery");
		}

	}, [authenticated, message, props.history])

	return (

		<Box sx={{
			height: "100vh", background: "linear-gradient(0deg, rgba(255,138,75,1) 0%, rgba(255,125,58,1) 100%)",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontFamily: "Nunito"
		}}>

			<Card sx={{
				width: {
					md: "400px",
					sm: "400px",
					xs: "95%"

				},
				padding: "24px 15px",
				borderRadius: "12px",

			}}>


				<Typography sx={{ fontFamily: "Nunito", fontSize: "22px", fontWeight: "900", textAlign: "center", mb: 2 }}>Ingresar</Typography>

				<Stack justifyContent={"center"} alignItems={"center"} mb={2}>
					<Avatar alt="Travis Howard" src="/images/imagotipo.png" sx={{ width: 95, height: 95,borderRadius:0 }} />
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
					{errors.email ? <FormHelperText error={errors.email} >Debe ingresar un correo</FormHelperText> : null}


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

					<Link style={{ marginTop: 18, textAlign: "center" }} href="/passwordReset">¿Olvidó su contraseña?</Link>

					{message && <Alert severity={"error"} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: "#e53935" }} >{message}</Alert>}

				</CardContent>
				<CardActions sx={{mt:3}}>



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
		</Box>

	)
}

export default Login
