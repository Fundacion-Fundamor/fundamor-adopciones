/* eslint-disable react-hooks/exhaustive-deps */
import './list.scss'
import React, { useEffect, useContext, useState } from 'react'
import PostContext from '../../context/post/postContext'
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Menu, MenuItem, Pagination, Skeleton, Stack, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { FaChevronDown } from 'react-icons/fa'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import 'moment/locale/es';

function List() {

	moment.locale('es');
	moment.updateLocale('es', {
		relativeTime: {
			future: "en %s",
			past: "%s ",
			s: 'unos segundos',
			ss: '%d segundos',
			m: "un minuto",
			mm: "%d minutos",
			h: "una hora",
			hh: "%d horas",
			d: "un día",
			dd: "%d dias",
			w: "una semana",
			ww: "%d semanas",
			M: "un mes",
			MM: "%d meses",
			y: "un año",
			yy: "%d años"
		}
	});
	//datos globales y locales
	const { posts, message, loading, getPosts, handlePostMessage } = useContext(PostContext); // contexto de posts
	const [localData, setLocalData] = useState({
		list: [],
		postsPerPage: 10,
		totalPages: 0,
		currentPage: 1,
		filters: {
			search: "",
			specie: "",
			state: ""
		}
	})

	//navegación
	let history = useHistory();
	let { url } = useRouteMatch();

	//layout y theming
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

	const MySwal = withReactContent(Swal);

	useEffect(() => {

		const displayAlert = async () => {
			let res = await MySwal.fire({
				title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
				allowOutsideClick: false,
				icon: message.category,
				backdrop: true

			});


			if (res.isConfirmed) {
				await handlePostMessage(null);
			}
		}
		if (message && message.showIn === "list" && !loading) {

			displayAlert();
		}
	}, [message, loading])

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {

		let result = posts.filter(element => {

			let condition = true;


			if (localData.filters.search !== "") {


				if (!(element.titulo.toLowerCase().includes(localData.filters.search.toLowerCase().trim()))) {
					condition = false;
				}

			}

			if (localData.filters.state !== "") {
				if (element.estado !== localData.filters.state) {
					condition = false;
				}
			}

			if (localData.filters.specie !== "") {
				if (element.especie !== localData.filters.specie) {
					condition = false;
				}
			}

			return condition ? element : null;

		})

		let totalPages = Math.ceil(result.length / localData.postsPerPage);
		setLocalData({ ...localData, currentPage: 1, list: result, totalPages: totalPages })

	}, [posts, localData.filters, localData.postsPerPage])


	useEffect(() => {
		window.scrollTo(0, 0)
	}, [localData.currentPage])


	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
				<CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
					<Box alignItems={"center"} display={"flex"}>
						<Tooltip title="Agrega, edita , busca y elimina las noticias publicadas en la plataforma de adopción">
							<IconButton>
								<BiHelpCircle />
							</IconButton>

						</Tooltip>
						<Typography variant="t2" >
							Listado de publicaciones
						</Typography>

						{matchDownSm ? <Button
							color="primary"
							onClick={() => { history.push("/posts/new"); }}
							variant="contained"
							startIcon={<AiOutlinePlus />}
							sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
						>
							Agregar
						</Button> : null}

					</Box>
					<Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>


						{!matchDownSm ? <Button
							color="primary"
							onClick={() => { history.push("/posts/new"); }}
							variant="contained"
							startIcon={<AiOutlinePlus />}
							sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
						>
							Agregar
						</Button> : null}


						<TextField
							sx={{
								ml: 3, "& .MuiOutlinedInput-root": {

									borderRadius: "10px!important"

								}
							}}
							id="input-with-icon-textfield"
							onChange={(event) => {
								setLocalData({
									...localData,
									filters: {
										...localData.filters,
										search: event.target.value,
									}

								})

							}}
							size='small'
							placeholder='Busca'
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AiOutlineSearch />
									</InputAdornment>
								),
							}}
							variant="outlined"
						/>
					</Box>
				</CardActions>
			</Card>
			<Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
				<CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
					{localData.list.map((element, index) => {

						let start = (localData.currentPage * localData.postsPerPage) - localData.postsPerPage;
						let end = (localData.currentPage * localData.postsPerPage);
						if ((index + 1) > start && (index + 1) <= end) {
							return (

								<Card key={index} variant="outlined" sx={{
									width: matchDownSm ? 200 : 300,
									height: 430,
									margin: 2, borderRadius: 2,
									padding: "0px important",
									transition: "all .2s ease-in-out",
									':hover': {
										transform: "scale(1.1)",

									},

								}}
									onClick={() => {

										console.log(element.id_publicacion)
										history.push(`${url}/detail/${element.id_publicacion}`);

									}}
								>

									<PostImage images={element.postImage} />


									<CardContent sx={{ flexDirection: "column", justifyContent: "space-between", display: "flex" }}>

										<div className="post-title">
											<p>{element.titulo}</p>
										</div>

										<div className="post-body">
											<p>{element.cuerpo}</p>
										</div>

										<Typography  color={theme.custom.primary.light} sx={{fontWeight:700}} variant='subtitle2'>{new Date(element.fecha_creacion).toLocaleDateString()}</Typography>

										{/* <Typography color={theme.custom.primary.dark} variant='subtitle2'>Hace {moment(element.fecha_creacion, "YYYYMMDDHHmmss").fromNow()}</Typography> */}
									</CardContent>


								</Card>

							)
						} else {
							return null;
						}
					}
					)}

					{loading && posts.length === 0 ?
						<Stack direction="row" mt={8} alignItems="center"><CircularProgress />
							<Typography sx={{ fontWeight: "500", ml: 2 }}>Cargando...</Typography>
						</Stack> : null}
					{posts.length === 0 && !loading ?
						<Typography sx={{ fontWeight: "600", mt: 8 }}>No hay publicaciones registradas</Typography> : null}

					{localData.list.length === 0 && !loading && posts.length !== 0 ?
						<Typography sx={{ fontWeight: "600", mt: 8 }}>No hay coincidencias</Typography> : null}
				</CardContent>

				<CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row", mt: 4 }}>


					<Pagination color="primary" count={localData.totalPages}
						page={localData.currentPage}
						onChange={(event, value) => { setLocalData({ ...localData, currentPage: value }) }} />

					<RowsManager numRows={localData.postsPerPage} handleRows={(val) => {

						setLocalData({ ...localData, postsPerPage: val })
					}} />


				</CardActions>
			</Card>
		</Box>

	)
}

const RowsManager = ({ numRows, handleRows }) => {

	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (value) => {
		if (value) {
			handleRows(value);
		}
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);


	return (<>

		<Button
			aria-describedby={"menu-rows"}
			color="primary"
			onClick={(ev) => handleClick(ev)}
			variant="text"
			endIcon={<FaChevronDown />}
			sx={{ mt: matchDownSm ? 3 : 0 }}
		>{numRows} por página</Button>


		<Menu
			id={"menu-rows"}
			anchorEl={anchorEl}
			open={open}
			onClose={() => handleClose(null)}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			PaperProps={{
				style: { borderRadius: 12 }
			}}
		>
			<MenuItem onClick={() => handleClose(10)}>10 publicaciones</MenuItem>
			<MenuItem onClick={() => handleClose(30)}>30 publicaciones</MenuItem>
			<MenuItem onClick={() => handleClose(50)}>50 publicaciones</MenuItem>
		</Menu>
	</>)
}


const PostImage = ({ images }) => {

	const [isLoaded, setIsLoaded] = useState(false)

	return images.length > 0 ? <>

		{!isLoaded ? <Skeleton variant="rectangular" height={230} sx={{ borderRadius: "8px" }} /> : null}
		<CardMedia
			onLoad={() => { setIsLoaded(true) }}
			component="img"
			height={isLoaded ? "230" : "0"}
			sx={{ objectFit: "cover" }}
			image={`${process.env.REACT_APP_API_URL}/${images[0].ruta}`}
			alt="imagen de la publicación"
		/>

	</> : <CardMedia
		onLoad={() => { setIsLoaded(true) }}
		component="img"
		height="230"
		sx={{ objectFit: "cover" }}
		image={`/images/no-pictures.png`}
		alt="imagen de la publicación"
	/>

}



export default List