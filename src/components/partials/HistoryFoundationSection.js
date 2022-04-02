import React, { useState } from 'react'

import './history.scss'


import ModalVideo from 'react-modal-video'

import Accordion from 'react-bootstrap/Accordion'

export function HistoryFoundationSection(params) {
    const [isOpen, setOpen] = useState(false)
    let youtube_video_id = "https://www.youtube.com/watch?v=HkJThi019OY".match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
    return (
        <div className='historical-area'>
            <div className='container'>
                <React.Fragment>
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" allowFullScreen={false} onClose={() => setOpen(false)} />
                </React.Fragment>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-sm-12 col-lg-6 col-md-6'>

                        <div onClick={() => setOpen(true)} className='history-wrapper' style={{ position: "relative", cursor: "pointer" }}>
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='my-2' eventKey="1">
                                    <Accordion.Header>Visión</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>

                </div>
            </div>

        </div>)
}