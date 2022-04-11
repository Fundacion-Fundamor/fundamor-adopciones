/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { List, CircularProgress, Typography, ListSubheader, ListItemButton, ListItemIcon, Collapse, Menu, MenuItem, Box, useTheme, Stack } from '@mui/material';

import { BsThreeDotsVertical, BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import QuestionContext from '../../context/question/questionContext';

import { AiOutlineInfoCircle } from 'react-icons/ai';


/**Listado de preguntas de adopción
 * 
 * @returns 
 */
export default function QuestionList() {

    const MySwal = withReactContent(Swal);
    const { questions, getQuestions, removeQuestion, selectQuestionEdit, loading } = useContext(QuestionContext);

    const theme = useTheme();


    const handleRemoveQuestion = (id) => {

        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar esta pregunta",
            icon: "question",
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeQuestion(id);;
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })

    }
    const handleSelectQuestionEdit = (item) => {
        selectQuestionEdit(item);
    }

    useEffect(() => {

        getQuestions();
    }, [])



    return (<Box p={3}>
        <Stack flexDirection={"row"} alignItems={"center"} display={"flex"} mb={2}>
            <AiOutlineInfoCircle color='#1976d2' size={24} />
            <Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2", fontWeight: 700 }} variant="subtitle1">Las preguntas serán mostradas a los usuarios en el orden en que sean registradas</Typography>

        </Stack>

        <List

            sx={{ width: '100%', bgcolor: 'white', borderColor: theme.custom.secondary.light, borderWidth: 1, borderStyle: "solid", borderRadius: "12px", }}
            component="div"
            aria-labelledby="nested-list-subheader"

            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ background: theme.custom.secondary.light, borderTopRightRadius: "12px", borderTopLeftRadius: "12px", fontWeight: "800", fontSize: 16, alignItems: "center", display: "flex" }} >
                    {"Preguntas registradas"}
                    {loading ? <CircularProgress size={20} sx={{ ml: 2 }} /> : null}
                </ListSubheader>
            }
        >

            {questions.map((element, index) => (<ListCustomItem question={element} index={index} handleSelectQuestionEdit={handleSelectQuestionEdit} removeQuestion={handleRemoveQuestion} key={index} />))}

        </List>

    </Box>)

}






const ListCustomItem = ({ question, removeQuestion, handleSelectQuestionEdit }) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const [collapsed, setCollapsed] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>

        <div style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center"
        }}>
            <ListItemButton onClick={() => { if (question.tipo_pregunta === "multiple") { setCollapsed(!collapsed); } }}>
                <ListItemIcon>
                    {question.tipo_pregunta === "multiple" ?
                        <>
                            {collapsed ? <BsChevronDown color="#616161" size={25} /> : <BsChevronRight color="#616161" size={25} />}
                        </> :
                        < GoPencil color="#616161" size={25} />
                    }
                </ListItemIcon>


                <Typography sx={{ fontSize: 16, ml: 1, color: "#757575", fontWeight: "bold" }} variant="subtitle1">{question.titulo}</Typography>

            </ListItemButton>
            <ListItemIcon>
                <BsThreeDotsVertical color="#616161" size={25} onClick={handleClick} />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    PaperProps={{
                        style: { borderRadius: 12 }
                    }}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                    }}
                >
                    <MenuItem onClick={() => { handleClose(); handleSelectQuestionEdit(question) }} >Editar</MenuItem>
                    <MenuItem onClick={() => { handleClose(); removeQuestion(question.id_pregunta) }} >Eliminar</MenuItem>

                </Menu>
            </ListItemIcon>
        </div>
        {question.tipo_pregunta === "multiple" ? <Collapse in={collapsed} timeout="auto" unmountOnExit>
            <List component="div" sx={{ ml: 8 }} disablePadding>
                {question.questionOptions.map((element, index) => (
                    <ListItemButton sx={{ pl: 4 }} key={index}>

                        <Typography sx={{ fontSize: 14, ml: 1, color: "#757575" }} variant="subtitle1">Opción {index + 1}: {element.descripcion}</Typography>

                    </ListItemButton>
                ))}
            </List>
        </Collapse> : null}
    </>);
}
