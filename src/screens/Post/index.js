import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/Post/List'
import './post.scss'

import Form from '../../components/Post/Form'
import {
  Button,
  Modal,
  Box,
} from '@mui/material'
import PostContext from '../../context/post/postContext'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Detail from '../../components/Post/Detail'


export default function Post() {
  const {
    selectedPost,
    selectPost,
    handlePostMessage,
  } = useContext(PostContext)

  const [showForm, setShowForm] = useState(false)

  const handleToggle = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    if (!showForm) {
      selectPost(null)
      handlePostMessage(null)
    }
  }, [showForm])

  useEffect(() => {
    if (selectedPost) {
      setShowForm(!showForm)
    }
  }, [selectedPost])

  let history = useHistory();
  let { path } = useRouteMatch();

  return (
    <div className="post-container">
      <div className="postBanner">
        <div className="postBanner__header">
          <h1>Gestiona las publicaciones</h1>
        </div>
        <svg
          className="postBanner__divider"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f29f058e"
          
            d="M0,96L24,112C48,128,96,160,144,154.7C192,149,240,107,288,112C336,117,384,171,432,192C480,213,528,203,576,176C624,149,672,107,720,74.7C768,43,816,21,864,53.3C912,85,960,171,1008,192C1056,213,1104,171,1152,144C1200,117,1248,107,1296,112C1344,117,1392,139,1416,149.3L1440,160L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
          ></path>
        </svg>
      </div>
      <Switch>
            <Route exact path={path}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Button size="medium" variant="contained"  color="primary" sx={{ margin: 5 }} onClick={() => {
                        history.push(`/posts/new/-1`);

                    }}>Crear una publicación</Button>
                    <List />

                </div>
            </Route>
            <Route path={`${path}/new/:postId`}>
                <Form />
            </Route>
            <Route path={`${path}/detail/:postId`}>
                <Detail />
            </Route>
        </Switch>

      <Modal
        open={showForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: 'scroll' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {showForm && <Form handleToggle={handleToggle} />}
        </Box>
      </Modal>
    </div>
  )
}
