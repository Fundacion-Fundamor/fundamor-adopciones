import { AppBar, Avatar, Box, Button, ButtonBase, Card, CardContent, Chip, ClickAwayListener, CssBaseline, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { green, grey, pink, red } from '@mui/material/colors';
import axiosClient from '../../config/axios';
import { MdPets } from "react-icons/md"
import { minWidth } from '@mui/system';
import { FaHandsHelping, FaRegClock } from 'react-icons/fa';
import { IoMedkitOutline } from 'react-icons/io5';
export default function Dashboard() {


    useEffect(() => {
        let mounted = true;


        const getNumberOfAnimals = async () => {




            try {

                const res = await axiosClient.get("/api/analytics/rescuedAnimals");
                console.log("animales", res.data)

            } catch (error) {
                console.log(error)
            }
        }
        // const getNumberOfAnimals = async () => {




        //     try {

        //         const res = await axiosClient.get("/api/analytics/countAnimals");
        //         console.log("animales", res.data)

        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        getNumberOfAnimals()
        return () => {

            mounted = false;
        }
    }, [])



    return (


        <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <CssBaseline />
            <Stack direction={"row"} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={2} flexWrap={"wrap"}>
                <Card sx={{
                    borderRadius: 3, bgcolor: "#1e88e5", position: "relative", paddingX: 5, minWidth: 275,
                    borderColor: "#1e88e5"
                }} variant='outlined'>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                            100
                        </Typography>
                        <Typography sx={{ fontWeight: "100", fontSize: 14, color: "white" }} >
                            Animales adoptados
                        </Typography>

                        <div
                            style={{
                                position: "absolute",
                                left: "-17px",
                                bottom: "-27px",
                                // transform: "rotate( 25deg)",
                            }}
                        >

                            <FaHandsHelping
                                size={88}
                                color='white'
                                opacity={0.35}
                            />
                    
                        </div>
                    </CardContent>


                </Card>
                <Card sx={{
                    borderRadius: 3, bgcolor: "#d32f2f", position: "relative", paddingX: 5, minWidth: 275,
                    borderColor: "#d32f2f"
                }} variant='outlined'>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                            900
                        </Typography>
                        <Typography sx={{ fontWeight: "100", fontSize: 14, color: "white" }} >
                            Animales rescatados
                        </Typography>

                        <div
                            style={{
                                position: "absolute",
                                left: "-17px",
                                bottom: "-27px",
                                transform: "rotate( 25deg)",
                            }}
                        >
                            <IoMedkitOutline
                              size={88}
                              color='white'
                              opacity={0.35}
                            />
                       
                        </div>
                    </CardContent>


                </Card>
                <Card sx={{
                    borderRadius: 3, bgcolor: "#512da8", position: "relative", paddingX: 5, minWidth: 275,
                    borderColor: "#512da8"
                }} variant='outlined'>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                            20
                        </Typography>
                        <Typography sx={{ fontWeight: "100", fontSize: 14, color: "white" }} >
                            Animales a la espera
                        </Typography>

                        <div
                            style={{
                                position: "absolute",
                                left: "-17px",
                                bottom: "-27px",
                                transform: "rotate( 25deg)",
                            }}
                        >
                            <FaRegClock
                            
                            size={88}
                            color='white'
                            opacity={0.35}
                            />
                        
                        </div>
                    </CardContent>


                </Card>
            </Stack>
        </Box >
    )
}