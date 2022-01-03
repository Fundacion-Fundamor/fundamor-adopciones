import { AppBar, Avatar, Box, Button, ButtonBase, Card, CardContent, Chip, ClickAwayListener, CssBaseline, Divider, FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Popper, Select, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { green, grey, pink, red } from '@mui/material/colors';
import axiosClient from '../../config/axios';
import { MdPets } from "react-icons/md"
import { minWidth } from '@mui/system';
import { FaHandsHelping, FaRegClock } from 'react-icons/fa';
import { IoMedkitOutline } from 'react-icons/io5';
import Chart from "react-apexcharts";
export default function Dashboard() {

    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            }
        },
        series: [
            {
                name: "Perros",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Gatos",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    })
    const [year, setYear] = useState(new Date().getFullYear());
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

    useEffect(() => {
        let mounted = true;


        const getNumberOfAnimals = async () => {
            try {
                let tmpSeries = chartData.series;
                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/rescuedAnimals?year=" + year);
                console.log("animales", res.data)
                if (res.data.state) {

                    // series: [
                    //     {
                    //         name: "Perros",
                    //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    //     },
                    //     {
                    //         name: "Gatos",
                    //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    //     }
                    // ]
                    let tmpSeries = chartData.series;

                    let dogsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    res.data.data.forEach((element, index) => {

                        dogsArray[element.rescue_month - 1] = element.rescued_animals

                    })
                    console.log("newData", dogsArray)
                    tmpSeries[0].data = dogsArray;

                    setChartData({
                        options: chartData.options,
                        series: tmpSeries


                    }
                    )
                }

            } catch (error) {
                console.log(error)
            }
        }

        getNumberOfAnimals()
        return () => {
        }
    }, [year])

    useEffect(() => {
        console.log("asadasd", chartData)
    }, [chartData.series])
    return (


        <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
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

            <Card>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Año</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Age"
                        onChange={(val) => { setYear(val.target.value) }}
                    >
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                    </Select>
                </FormControl>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    width="500"

                />

            </Card>
        </Box >
    )
}