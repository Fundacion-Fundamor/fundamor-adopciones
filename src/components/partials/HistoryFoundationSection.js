import React, { useContext, useState } from 'react'

import './history.scss'


import ModalVideo from 'react-modal-video'

import Accordion from 'react-bootstrap/Accordion'
import FoundationContext from '../../context/foundation/foundationContext'

export function HistoryFoundationSection(params) {
    const [isOpen, setOpen] = useState(false)
    const { currentFoundation } = useContext(FoundationContext)
    let youtube_video_id = "";

    if (currentFoundation && currentFoundation.url_video) {
        console.log(currentFoundation.url_video)
        let tmp =[]
        if(currentFoundation.url_video.includes("watch")){
            
            tmp= currentFoundation.url_video.split('?v=')
        }else{
            tmp= currentFoundation.url_video.split('/')
        }
     
        youtube_video_id = tmp[tmp.length - 1];
    }


    return (
        <div className='historical-area'>
            <div className='container'>
                <React.Fragment>
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={youtube_video_id}  allowFullScreen={false} onClose={() => setOpen(false)} />
                </React.Fragment>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-sm-12 col-lg-6 col-md-6'>
                        <div onClick={() => { if (youtube_video_id !== "") { setOpen(true) } }} className='history-wrapper' style={{ position: "relative", cursor: youtube_video_id !== "" ? "pointer" : "auto" }}>
                            <img src='/images/tv-frame.png' style={{ position: "absolute", zIndex: 1, width: "100%", bottom: 0 }} alt="tv" />
                            <img style={{ position: "absolute", width: "79%", zIndex: 0, bottom: "4%", left: "7%", borderRadius: "8px" }} src={'https://img.youtube.com/vi/' + youtube_video_id + '/hqdefault.jpg'} width={200} alt="preview video de presentación" />
                        </div>
                    </div>
                    <div className='col-m6-12 col-lg-6 col-md-12'>

                        <div className='foundation-info'>
                            <h3>Acerca de la fundación</h3>
                            <h2 className='mb-3'>Historia y futuro</h2>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Item className='my-2 rounded-3' eventKey="0">
                                    <Accordion.Header >Misión</Accordion.Header>
                                    <Accordion.Body>
                                        {currentFoundation && currentFoundation.mision !== "" ? currentFoundation.mision : "No registra"}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='my-2' eventKey="1">
                                    <Accordion.Header>Visión</Accordion.Header>
                                    <Accordion.Body>
                                        {currentFoundation && currentFoundation.vision !== "" ? currentFoundation.vision : "No registra"}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>

                </div>
            </div>

        </div >)
}