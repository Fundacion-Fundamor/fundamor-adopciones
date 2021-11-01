import React, { useState, useEffect, useContext } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { CardActions, CardContent, Container, Typography, Button, Paper, TextField, IconButton, CircularProgress, Alert } from '@mui/material';
import QuestionContext from '../../context/question/questionContext';

import { GrClose } from 'react-icons/gr';

export default function EditModal({ handleToggle }) {
    const { createQuestion, message, loading, selectedEditQuestion } = useContext(QuestionContext);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [question, setQuestion] = useState(selectedEditQuestion.titulo);

    const addQuestionOption = (text = "", id = "") => {

        let tmp = [...questionOptions];
        tmp.push({ text: text, key: uuidv4(), id: id });
        setQuestionOptions(tmp);
    }
    const saveQuestionOption = (option) => {

        let tmp = questionOptions.filter((element, index) => {
            if (option.key === element.key) {
                element.text = option.text;
            }
            return element;
        });

        setQuestionOptions(tmp);

    }
    const saveQuestion = () => {

        let formattedQuestionOptions = []

        questionOptions.forEach(element => {
            if (element.text !== "") {
                formattedQuestionOptions.push({ descripcion: element.text });
            }
        });
        createQuestion({
            title: question,
            questionType: formattedQuestionOptions.length !== 0 ? "multiple" : "abierta",
            questionOptions: formattedQuestionOptions
        })
    }

    const removeQuestionOption = (option) => {

        let tmp = questionOptions.filter((element) => option.key !== element.key);
        setQuestionOptions(tmp)
    }

    useEffect(() => {
        if (message && message.category === "success") {
            setQuestion("");
            setQuestionOptions([]);
        }
    }, [message])
    useEffect(() => {
        let tmp = selectedEditQuestion.questionOptions;

        let options = []
        tmp.forEach(element => {
            options.push({ text: element.descripcion, key: uuidv4(), id: element.id_opcion });
        });
        setQuestionOptions(options);
    }, [])

    return <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 15, margin: 30, marginBottom: 30 }}>


        <div style={{ display: "flex", justifyContent: "space-between" }}>

            <h3>Edita la pregunta</h3>


            <GrClose size={35} color="#000" onClick={handleToggle} cursor="pointer" />
        </div>
        <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
            <TextField
                multiline={true}
                id="question-field"
                sx={{ width: "100%", marginRight: 3 }}
                variant="filled"
                label="Ingresa aquí tu pregunta"
                placeholder="Ejemplo: ¿Por que está interesado en adoptar?"
                value={question}
                onChange={(e) => { setQuestion(e.target.value) }}
            />
            <Button size="small" variant="contained" disabled={question.length === 0} color="success" onClick={saveQuestion}>Guardar</Button>
        </CardContent>
        <CardActions sx={{ flexDirection: "column", padding: 3 }}>

            {message && message.showIn === "form" && <Alert severity={message.category} variant="filled" style={{ marginTop: 20, marginBottom: 5 }} >{message.text}</Alert>}
            {questionOptions.length !== 0 ? <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                Las opciones de respuesta se mostrarán en el orden en sean registradas
            </Typography> : null}
            {questionOptions.map((element, index) => (
                <QuestionOption key={index} index={index} option={element} saveQuestionOption={saveQuestionOption} removeQuestionOption={removeQuestionOption} />
            ))}
            <Button size="small" onClick={() => addQuestionOption()}>Añadir opción de respuesta</Button>
        </CardActions>

    </div>


}

const QuestionOption = ({ index, option, saveQuestionOption, removeQuestionOption }) => {

    console.log(option.text)
    const [text, setText] = useState(option.text);

    useEffect(() => {
        setText(option.text);
    }, [option.text]);

    return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 23, width: "100%" }}>

        <TextField
            multiline={true}
            sx={{ marginLeft: 0, width: "100%" }}
            id={"question-field" + index}
            fullWidth
            variant="standard"
            label={"Opción de respuesta " + (index + 1)}
            value={text}
            onChange={(e) => { setText(e.target.value) }}
            onBlur={() => { if (text !== "") { saveQuestionOption({ key: option.key, text: text }) } }}
        />

        <IconButton aria-label="add to favorites" onClick={() => {
            removeQuestionOption({ key: option.key, text: text });
        }}>
            <BiTrashAlt
                size={25}
                cursor="pointer"
                color="#d46161"
            />
        </IconButton>

    </div>


}