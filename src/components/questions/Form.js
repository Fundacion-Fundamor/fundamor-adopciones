import React, { useState, useEffect, useContext } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { CardActions, CardContent, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import QuestionContext from '../../context/question/questionContext';
import { AiOutlineSave } from 'react-icons/ai';
import LoadingButton from '@mui/lab/LoadingButton';

/**Formulario de registro de preguntas de adopción
 * 
 * @returns 
 */
export default function Form() {


    const [questionOptions, setQuestionOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const { createQuestion, message, loading } = useContext(QuestionContext);

    const addQuestionOption = () => {

        let tmp = [...questionOptions];
        tmp.push({ text: "", key: uuidv4() });
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

    return (<Box sx={{ margin: 3 }} >
        <CardContent sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center", alignItems: "center" }} >
            <TextField
                multiline={true}
                id="question-field"
                sx={{
                    width: "100%", marginRight: {
                        xs:0,
                        md:3
                    }, "& .MuiOutlinedInput-root": {

                        borderRadius: "10px!important"
                    },
                }}
                variant="outlined"
                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                rows={3}
                label="Nueva pregunta"
                placeholder="Ejemplo: ¿Por que está interesado en adoptar?"
                value={question}
                onChange={(e) => { setQuestion(e.target.value) }}
            />
            <LoadingButton loading={loading && question.length !== 0}
                size="small" variant="contained" color="primary" sx={{
                    fontSize: 12, height: 40, px: 2, alignItems: "center", borderRadius: "8px", fontWeight: "bold",
                    mt: {
                        xs: 2,
                        md: 0
                    },
                    width:{
                        xs:"100%",
                        md:"120px"
                    }
                }}

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
        </CardContent>
        <CardActions sx={{ flexDirection: "column", padding: 3 }}>

            {questionOptions.length !== 0 ? <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                Las opciones de respuesta se mostrarán en el orden en que sean registradas
            </Typography> : null}

            {questionOptions.map((element, index) => (
                <QuestionOption key={index} index={index} option={element} saveQuestionOption={saveQuestionOption} removeQuestionOption={removeQuestionOption} />
            ))}

            <Button size="small" sx={{ borderRadius: "8px", fontSize: 12 }} onClick={addQuestionOption}>Añadir opción de respuesta</Button>
        </CardActions>

    </Box>)



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