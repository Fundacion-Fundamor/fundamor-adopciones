import React, { useState, useContext, useEffect } from 'react'
import { CardActions, CardContent, Container, List, Typography, Button, Paper, TextField, IconButton, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider, Menu, MenuItem } from '@mui/material';

import { BsThreeDotsVertical, BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';

import QuestionContext from '../../context/question/questionContext';
export default function QuestionList() {


    const { questions, getQuestions } = useContext(QuestionContext);

    useEffect(() => {

        getQuestions();
    }, [])
    return <Container maxWidth="xl" sx={{ marginTop: 8 }}>

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
                {questions.map((element, index) => (<ListCustomItem question={element} key={index} />))}
            </List>
        </Paper>
    </Container >

}


const ListCustomItem = ({ question }) => {

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
                    <MenuItem >Editar</MenuItem>
                    <MenuItem >Eliminar</MenuItem>

                </Menu>
            </ListItemIcon>
        </div>
        {question.tipo_pregunta === "multiple" ? <Collapse in={collapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>

                    <ListItemText primary="Si" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>

                    <ListItemText primary="No" />
                </ListItemButton>
            </List>
        </Collapse> : null}


    </>);
}
