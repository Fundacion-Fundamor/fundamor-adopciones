import React, { useState, useContext, useEffect } from 'react'
import { CardActions, CardContent, Container, List, Typography, Button, Paper, TextField, IconButton, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider, Menu, MenuItem } from '@mui/material';

import { BsThreeDotsVertical, BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';

import QuestionContext from '../../context/question/questionContext';
export default function QuestionList() {


    const { questions, getQuestions, removeQuestion, selectQuestionEdit } = useContext(QuestionContext);

    useEffect(() => {

        getQuestions();
    }, [])

    const handleRemoveQuestion = (id) => {
        removeQuestion(id);
    }
    const handleSelectQuestionEdit = (item) => {
        selectQuestionEdit(item);
    }
    return <Container maxWidth="xl" sx={{ marginTop: 8, marginBottom: 15 }}>

        <Paper elevation={3} >

            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Preguntas registradas
                    </ListSubheader>
                }
            >
                {questions.map((element, index) => (<ListCustomItem question={element} handleSelectQuestionEdit={handleSelectQuestionEdit} removeQuestion={handleRemoveQuestion} key={index} />))}
            </List>
        </Paper>
    </Container >

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
                <ListItemText primary={question.titulo} />
            </ListItemButton>
            <ListItemIcon>
                <BsThreeDotsVertical color="#616161" size={25} onClick={handleClick} />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {  handleSelectQuestionEdit(question) }} >Editar</MenuItem>
                    <MenuItem onClick={() => removeQuestion(question.id_pregunta)} >Eliminar</MenuItem>

                </Menu>
            </ListItemIcon>
        </div>
        {question.tipo_pregunta === "multiple" ? <Collapse in={collapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {question.questionOptions.map((element, index) => (
                    <ListItemButton sx={{ pl: 4 }} key={index}>
                        <ListItemText primary={element.descripcion} />
                    </ListItemButton>
                ))}
            </List>
        </Collapse> : null}
    </>);
}
