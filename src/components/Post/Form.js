/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from 'react'
import './form.scss'
import {
	Button,
	TextField,
	Box,
	Card,
	CardActions,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
	CardContent,
	ImageList,
	Chip,
	ImageListItem,
	ImageListItemBar,
	Stack,
	Divider,
} from '@mui/material'

import PostContext from '../../context/post/postContext'
import { grey } from '@mui/material/colors'
import { BiHelpCircle, BiTrashAlt } from 'react-icons/bi'
import ImageUploading from 'react-images-uploading';
import { AiOutlineInfoCircle, AiOutlineSave } from 'react-icons/ai'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'


const maxNumber = 8; //max number images
/**Componente encargado del registro y edición de un colaborador
 *
 * @param {*} param0
 * @returns
 */
export default function Form() {
	const { createPost, handlePostMessage, loading, message } = useContext(PostContext)

	const MySwal = withReactContent(Swal);
	const [values, setValues] = useState({
		id_publicacion: '',
		titulo: '',
		cuerpo: '',

	})

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState({
		id_publicacion: null,
		titulo: null,
		cuerpo: null,
	})

	/**Captura el cambio al seleccionar una nueva imágen
		* 
		* @param {*} imageList 
		* @param {*} addUpdateIndex 
		*/
	const onChangeImages = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	let history = useHistory();


	//layout y theming
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

	const onSubmit = async () => {

		//se validan los campos del formulario

		if (values.titulo === '') {
			setErrors({ ...errors, titulo: 'Debe ingresar un titulo' })
		} else if (values.cuerpo === '') {
			setErrors({ ...errors, cuerpo: 'Debe ingresar un cuerpo' })
		} else {

			//se guardan los datos del colaborador
			createPost(values, images)

		}
	}

	useEffect(() => {
		const displayAlert = async () => {
			let res = await MySwal.fire({
				title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight:1.2  }}>{message.text}</p>,
				allowOutsideClick: false,
				icon: message.category,

			});


			if (res.isConfirmed) {

				await handlePostMessage(null);

				if (message.category === "success") {
					history.push("/posts");
				}
			}
		}
		if (message && message.showIn === "form") {

			displayAlert();
		}

	}, [message]);


	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
				<CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

					<Tooltip title="Cree y comparta nuevas publicaciones">
						<IconButton>
							<BiHelpCircle />
						</IconButton>

					</Tooltip>
					<Typography variant="t2"  >
						Nueva publicación
					</Typography>
				</CardActions>

			</Card>
			<Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius, justifyContent: "center", display: "flex", flexDirection: matchDownSm ? "column" : "row" }} >
				<ImageUploading
					multiple
					value={images}
					onChange={onChangeImages}
					maxNumber={maxNumber}
					dataURLKey="data_url"
					maxFileSize={5000000}
					acceptType={['jpg', 'png']}
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps,
						errors
					}) => (
						// write your building UI
						<div style={{ display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#ededed", padding: 12, borderRadius: 12, margin: 22 }}>




							{imageList.length !== 0 && false ? <Button size="small" onClick={onImageRemoveAll} variant="contained" color="info">Eliminar Todo</Button> : null}

							<Button onClick={onImageUpload} size="small" sx={{ marginTop: 2, borderRadius: "8px" }} color={isDragging ? "info" : "primary"} variant="contained" >Seleccionar imágenes</Button>
							<Chip sx={{ marginTop: 2 }} label={imageList.length + "/8"} />
							{errors && <div>
								{errors.maxNumber && <span>Solo puede adjuntar un máximo de {maxNumber} imágenes</span>}
								{errors.acceptType && <span>Este tipo de archivo no está soportado</span>}
								{errors.maxFileSize && <span>Cada imágen debe pesar máximo 5Mb</span>}

							</div>}
							<div style={{ marginTop: imageList.length > 0 ? 15 : 0, display: "flex" }}>

								<ImageList sx={{ width: "100%", }} cols={matchDownSm ? 1 : imageList.length > 2 ? 2 : imageList.length} >
									{imageList.map((image, index) => (
										<ImageListItem key={index} sx={{ borderRadius: 8, }}>
											<img
												style={{ maxWidth: 200, borderRadius: 8, minHeight: 160, objectFit: "cover" }}
												src={image['data_url']}
												alt={image["file"].name}
												loading="lazy"
											/>
											<ImageListItemBar
												subtitle={index === 0 ? "Principal" : "Secundaria"}
												sx={{ backgroundColor: index === 0 ? theme.custom.primary.dark : "rgba(0, 0, 0, 0.5)", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
												actionIcon={
													<IconButton
														sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
														aria-label={`info about this`}
														onClick={() => onImageRemove(index)}
													>
														<BiTrashAlt />
													</IconButton>
												}
											/>
										</ImageListItem>
									))}
								</ImageList>
							</div>
							<Stack flexDirection={"row"} alignItems={"center"} display={"flex"}>
								<AiOutlineInfoCircle color='#1976d2' size={24} />
								<Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2" }} variant="subtitle2">La imagen principal de la publicación corresponderá a la primera que sea seleccionada </Typography>

							</Stack>
						</div>
					)}
				</ImageUploading>

				<CardContent sx={{ maxWidth: 600, justifyContent: "center", p: 5 }}>
					<TextField
						fullWidth
						error={errors.titulo != null}
						label="Titulo"
						helperText={errors.titulo}
						variant="outlined"
						InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
						value={values.titulo}
						onChange={(event) => {
							setValues({ ...values, titulo: event.target.value })
							setErrors({ ...errors, titulo: null })
						}}
					/>



					<TextField
						fullWidth
						error={errors.cuerpo !== null}
						label="Cuerpo"
						helperText={errors.cuerpo}
						multiline
						minRows={5}
						maxRows={20}
						variant="outlined"
						value={values.cuerpo}
						sx={{ mt: 4 }}
						InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
						onChange={(event) => {
							setValues({ ...values, cuerpo: event.target.value })
							setErrors({ ...errors, cuerpo: null })
						}}
					/>


					<Divider sx={{ mt: 5 }} />
					<Box sx={{ justifyContent: "space-between", padding: 3, }} display="flex">

						<Button size="medium" variant="contained" color='inherit'

							sx={{

								color: grey[600],
								fontSize: 12, height: 40, px: 5, mr: 4, alignItems: "center", borderRadius: "8px", fontWeight: "bold"
							}}
							onClick={() => {

								history.goBack()

							}}>Cancelar</Button>

						<LoadingButton loading={loading}
							size="medium" variant="contained" color="success" sx={{ fontSize: 12, height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}

							onClick={() => {

								if (!loading) {
									onSubmit()

								}
							}}
							startIcon={<AiOutlineSave size={20} />}

						>
							Guardar
						</LoadingButton>
					</Box>

				</CardContent>
			</Card>
		</Box >

	)
}
