import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import PostContext from '../../context/post/postContext';
import Form from '../tracking/Form';
import { Button, Modal, Box } from '@mui/material';
import ModalUpdate from './ModalUpdate';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Detail() {


    const { message, loading, selectedPost, handlePostMessage, getPost,removePost } = useContext(PostContext);// contexto de adopcion
    const [showFormTracking, setshowFormTracking] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    let { postId } = useParams();
    const MySwal = withReactContent(Swal);

    let history = useHistory();
    useEffect(() => {
        getPost(postId);
    }, [])

    const toggleModalTracking = () => {
        setshowFormTracking(!showFormTracking);
    }
    const toggleModalEdit = () => {
        setShowFormEdit(!showFormEdit);
    }
    const onRemovePost = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar esta publicación?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removePost(postId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
    }

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true,
            });


            if (res.isConfirmed) {

                await handlePostMessage(null);
                if (message.category === "success") {
                    history.push("/posts");
                }
            }
        }
        if (message && message.showIn === "detail" && !loading) {

            displayAlert();
        }

    }, [message, loading]);

    return <div>
        {selectedPost ? <p>{JSON.stringify(selectedPost)}</p> : null}
        {loading ? <p>Cargando...</p> : null}
        <Button size="medium" variant="contained"  color="primary" sx={{ marginTop: 5 }} onClick={() => toggleModalTracking()}>Nuevo segumiento</Button>

        <Button size="medium" variant="contained" color="primary" sx={{ marginTop: 5 }} onClick={() => toggleModalEdit()}>Editar</Button>
        <Button size="medium" variant="contained" color="error" sx={{ marginTop: 5 }} onClick={() => onRemovePost()}>Eliminar adopción</Button>

        <Modal
            open={showFormTracking}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showFormTracking && <Form handleModal={toggleModalTracking} postID={postId} />}
            </Box>


        </Modal>

        <Modal
            open={showFormEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showFormEdit && <ModalUpdate handleModal={toggleModalEdit} postId={selectedPost.id_adopcion} postState={selectedPost.estado} observations={selectedPost.observaciones} finalDate={selectedPost.fecha_entrega} />}
            </Box>

        </Modal>
    </div>
}