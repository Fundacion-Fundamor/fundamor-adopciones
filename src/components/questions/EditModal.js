/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { CardActions, CardContent, Typography, Button, TextField, IconButton, Card, Stack } from '@mui/material';
import QuestionContext from '../../context/question/questionContext';
import LoadingButton from '@mui/lab/LoadingButton';

import { GrClose } from 'react-icons/gr';
import { grey } from '@mui/material/colors';
import { AiOutlineSave } from 'react-icons/ai';

export default function EditModal({ handleToggle }) {
    const { editQuestion, message, loading, selectedEditQuestion } = useContext(QuestionContext);
    const [questionOptions, setQuestionOptions] = useState([]);

    const [questionOptionsRemove, setQuestionOptionsRemove] = useState([]);
    const [question, setQuestion] = useState(selectedEditQuestion);

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

        if (!loading) {
            editQuestion({
                questionID: question.id_pregunta,
                title: question.titulo,
            }, questionOptions, questionOptionsRemove);
        }
    }

    const removeQuestionOption = (option) => {

        let tmp = questionOptions.filter((element) => option.key !== element.key);
        setQuestionOptionsRemove([...questionOptionsRemove, option]);
        setQuestionOptions(tmp)
    }

    useEffect(() => {
        let tmp = selectedEditQuestion.questionOptions;

        let options = []
        tmp.forEach(element => {
            options.push({ text: element.descripcion, key: uuidv4(), id: element.id_opcion });
        });
        setQuestionOptions(options);
    }, [])


    useEffect(() => {


        if (message && message.category === "success") {
            handleToggle();
        }

    }, [message]);

    return (

        <Card style={{ minWidth: 300, backgroundColor: "#fff", padding: 24, borderRadius: 15, margin: 30, marginBottom: 30 }}>



            <Stack direction="row" alignItems={"flex-start"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: 18, ml: 1, color: grey[600] }} variant="subtitle2">Edita la pregunta</Typography>


                <GrClose size={25} onClick={handleToggle} cursor="pointer" />
            </Stack>
            <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", mt: 3 }} >
                <TextField
                    multiline={true}
                    rows={2}
                    id="question-field"
                    variant="outlined"
                    sx={{
                        width: "100%", marginRight: 3, "& .MuiOutlinedInput-root": {

                            borderRadius: "10px!important"

                        },
                    }}
                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                    fullWidth={true}
                    label="Pregunta"
                    placeholder="Ejemplo: ¿Por que está interesado en adoptar?"
                    value={question.titulo}
                    onChange={(e) => { setQuestion({ ...question, titulo: e.target.value }) }}
                />
            </CardContent>
            <CardActions sx={{ flexDirection: "column", padding: 3 }}>

                {questionOptions.length !== 0 ? <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                    Las opciones de respuesta se mostrarán en el orden en que sean registradas
                </Typography> : null}
                {questionOptions.map((element, index) => (
                    <QuestionOption key={index} index={index} option={element} saveQuestionOption={saveQuestionOption} removeQuestionOption={removeQuestionOption} />
                ))}


                <Button size="small" onClick={() => addQuestionOption()}>Añadir opción de respuesta</Button>

                {/* <Button size="medium" sx={{ marginTop: 3 }} variant="contained" disabled={question.length === 0} color="primary" onClick={saveQuestion}>Guardar cambios</Button> */}

                <LoadingButton loading={loading && question.length !== 0}
                    size="medium" variant="contained" color="primary" sx={{ fontSize: 12, height: 40, px: 2, marginTop: 3, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}

                    disabled={question.length === 0}
                    onClick={() => {

                        if (!loading) {
                            saveQuestion()

                        }
                    }}
                    startIcon={<AiOutlineSave />}

                >
                    Guardar
                </LoadingButton>
            </CardActions>


        </Card>)


}

const QuestionOption = ({ index, option, saveQuestionOption, removeQuestionOption }) => {

    const [text, setText] = useState(option.text);

    useEffect(() => {
        setText(option.text);
    }, [option.text]);

    return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 23, width: "100%" }}>

        <TextField
            multiline={true}

            id={"question-field" + index}
            fullWidth
            sx={{
                width: "100%", marginRight: 3, "& .MuiOutlinedInput-root": {

                    borderRadius: "10px!important"

                },
            }}
            variant="outlined"
            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
            label={"Opción de respuesta " + (index + 1)}
            value={text}
            onChange={(e) => { setText(e.target.value) }}
            onBlur={() => { if (text !== "") { saveQuestionOption({ key: option.key, text: text, id: option.id }) } }}
        />

        <IconButton aria-label="add to favorites" onClick={() => {
            removeQuestionOption({ key: option.key, text: text, id: option.id });
        }}>
            <BiTrashAlt
                size={25}
                cursor="pointer"
                color="#d46161"
            />
        </IconButton>

    </div>


}