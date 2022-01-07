import { AppBar, Avatar, Box, Button, ButtonBase, Card, CardContent, Chip, ClickAwayListener, CssBaseline, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Popper, Select, Stack, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { green, grey, pink, red } from '@mui/material/colors';
import axiosClient from '../../config/axios';
import { MdPets } from "react-icons/md"
import { minWidth } from '@mui/system';
import { FaHandsHelping, FaRegClock } from 'react-icons/fa';
import { IoMedkitOutline } from 'react-icons/io5';
import Chart from "react-apexcharts";
import { BiHelpCircle } from 'react-icons/bi';
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
        // getNumberOfAnimals()
        return () => {

            mounted = false;
        }
    }, [])


    return (


        <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
            <CssBaseline />
            <Stack direction={"row"} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={2} flexWrap={"wrap"}>


                <CardAnimalsAdopted />
                <CardAnimalsRescued />
                <CardAnimalsWaiting />

                <SterilizedAnimals />
                <RescuedAnimalsChart />
                <RescuedAnimalsChartPerGender />
                <AdoptedAnimalsChart />
                <AdoptedAnimalsChartPerGender />

            </Stack>



        </Box >
    )
}

const CardAnimalsWaiting = () => {

    const [number, setNumber] = useState(0)
    useEffect(() => {
        let mounted = true;
        const getNumberOfAnimals = async () => {

            try {

                const res = await axiosClient.get("/api/analytics/countAnimals?adopted=false");
                if (res.data.state) {
                    console.log("animales", res.data)
                    setNumber(res.data.data)
                }


            } catch (error) {
                console.log(error)
            }
        }

        getNumberOfAnimals()
        return () => {

            mounted = false;
        }
    }, [])


    return (
        <Card sx={{
            borderRadius: 3, bgcolor: "#512da8", position: "relative", paddingX: 5, minWidth: 275,
            borderColor: "#512da8"
        }} variant='outlined'>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                    {number}
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

    )
}


const CardAnimalsRescued = () => {

    const [number, setNumber] = useState(0)
    useEffect(() => {
        let mounted = true;
        const getNumberOfAnimals = async () => {

            try {

                const res = await axiosClient.get("/api/analytics/countAnimals");
                if (res.data.state) {
                    console.log("animales", res.data)
                    setNumber(res.data.data)
                }


            } catch (error) {
                console.log(error)
            }
        }

        getNumberOfAnimals()
        return () => {

            mounted = false;
        }
    }, [])


    return (
        <Card sx={{
            borderRadius: 3, bgcolor: "#d32f2f", position: "relative", paddingX: 5, minWidth: 275,
            borderColor: "#d32f2f"
        }} variant='outlined'>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                    {number}
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

    )
}


const CardAnimalsAdopted = () => {

    const [number, setNumber] = useState(0)
    useEffect(() => {
        let mounted = true;
        const getNumberOfAnimals = async () => {

            try {

                const res = await axiosClient.get("/api/analytics/countAnimals?adopted=true");
                if (res.data.state) {
                    console.log("animales", res.data)
                    setNumber(res.data.data)
                }


            } catch (error) {
                console.log(error)
            }
        }

        getNumberOfAnimals()
        return () => {

            mounted = false;
        }
    }, [])


    return (
        <Card sx={{
            borderRadius: 3, bgcolor: "#1e88e5", position: "relative", paddingX: 5, minWidth: 275,
            borderColor: "#1e88e5"
        }} variant='outlined'>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "calc(100% + 8px)" }}>
                <Typography variant="t2" sx={{ fontWeight: "600", color: "white" }} >
                    {number}
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


    )
}

const RescuedAnimalsChart = () => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
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

    useEffect(() => {
        let mounted = true;


        const getRescuedAnimals = async () => {
            try {
                let tmpSeries = chartData.series;
                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/rescuedAnimals?year=" + year);
                console.log("animales", res.data)
                if (res.data.state) {

                    let rescuedCats = res.data.data.cats;
                    let rescuedDogs = res.data.data.dogs;



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
                    let tmpSeries = []

                    let dogsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let catsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    rescuedDogs.forEach((element, index) => {

                        dogsArray[element.rescue_month - 1] = element.rescued_animals

                    })

                    rescuedCats.forEach((element, index) => {

                        catsArray[element.rescue_month - 1] = element.rescued_animals

                    })
                    // console.log("newData", dogsArray)
                    tmpSeries[0] = { name: "Perros", data: dogsArray };
                    tmpSeries[1] = { name: "Gatos", data: catsArray };
                    if (mounted) {
                        setChartData({
                            options: chartData.options,
                            series: tmpSeries


                        })
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

        getRescuedAnimals()
        return () => {
        }
    }, [year])

    useEffect(() => {
        console.log("asadasd", chartData)
    }, [chartData.series])


    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza y exporta la lista de animales rescatados por año y clasificados por especie">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Animales rescatados
                </Typography>
            </Stack>
            <FormControl >
                {/* <InputLabel id="demo-simple-select-label">Año</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age"
                    sx={{ borderRadius: 3, maxHeight: 42 }}
                    onChange={(val) => { setYear(val.target.value) }}
                >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>

        </Stack>

        <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"

        />
    </Card>


    )
}

const RescuedAnimalsChartPerGender = () => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },
            colors: ["#242880", "#e38fc4"]
        },
        series: [
            {
                name: "Machos",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Hembras",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    })

    useEffect(() => {
        let mounted = true;


        const getRescuedAnimals = async () => {
            try {

                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/rescuedAnimalsPerGender?year=" + year);
                console.log("Por genero", res.data)
                if (res.data.state) {

                    let male = res.data.data.male;
                    let female = res.data.data.female;


                    let tmpSeries = []

                    let maleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let femaleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    male.forEach((element, index) => {

                        maleArray[element.rescue_month - 1] = element.rescued_animals

                    })

                    female.forEach((element, index) => {

                        femaleArray[element.rescue_month - 1] = element.rescued_animals

                    })
                    // console.log("newData", dogsArray)
                    tmpSeries[0] = { name: "Machos", data: maleArray };
                    tmpSeries[1] = { name: "Hembras", data: femaleArray };
                    if (mounted) {
                        setChartData({
                            options: chartData.options,
                            series: tmpSeries


                        })
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

        getRescuedAnimals()
        return () => {
        }
    }, [year])


    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza y exporta la lista de animales rescatados por año y clasificados por sexo">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Animales rescatados (por sexo)
                </Typography>
            </Stack>
            <FormControl >
                {/* <InputLabel id="demo-simple-select-label">Año</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age"
                    sx={{ borderRadius: 3, maxHeight: 42 }}
                    onChange={(val) => { setYear(val.target.value) }}
                >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>

        </Stack>

        <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"

        />
    </Card>


    )
}
const AdoptedAnimalsChart = () => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },
            colors: ['#9C27B0', '#E91E63',]
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

    useEffect(() => {
        let mounted = true;


        const getRescuedAnimals = async () => {
            try {
                let tmpSeries = chartData.series;
                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/adoptedAnimals?year=" + year);
                console.log("animalesAdoptados", res.data)
                if (res.data.state) {

                    let adoptedCats = res.data.data.cats;
                    let adoptedDogs = res.data.data.dogs;

                    let tmpSeries = []

                    let dogsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let catsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    adoptedDogs.forEach((element, index) => {

                        dogsArray[element.month - 1] = element.adopted_animals

                    })


                    adoptedCats.forEach((element, index) => {

                        catsArray[element.month - 1] = element.adopted_animals

                    })

                    tmpSeries[0] = { name: "Perros", data: dogsArray };
                    tmpSeries[1] = { name: "Gatos", data: catsArray };
                    if (mounted) {
                        setChartData({
                            options: chartData.options,
                            series: tmpSeries


                        })
                    }

                }

            } catch (error) {
                console.log(error)
            }
        }

        getRescuedAnimals()
        return () => {
        }
    }, [year])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza y exporta la lista de animales adoptados por año y clasificados por especie">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Animales adoptados
                </Typography>
            </Stack>
            <FormControl >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age"
                    sx={{ borderRadius: 3, maxHeight: 42 }}
                    onChange={(val) => { setYear(val.target.value) }}
                >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>

        </Stack>

        <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="500"

        />
    </Card>


    )
}



const AdoptedAnimalsChartPerGender = () => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },
            colors: ['#9C27B0', '#E91E63',]
        },
        series: [
            {
                name: "Machos",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Hembras",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    })

    useEffect(() => {
        let mounted = true;


        const getRescuedAnimals = async () => {
            try {
                let tmpSeries = chartData.series;
                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/adoptedAnimalsPerGender?year=" + year);
                console.log("animalesAdoptados", res.data)
                if (res.data.state) {

                    let male = res.data.data.male;
                    let female = res.data.data.female;

                    let tmpSeries = []

                    let maleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let femaleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    male.forEach((element, index) => {

                        maleArray[element.month - 1] = element.adopted_animals

                    })


                    female.forEach((element, index) => {

                        femaleArray[element.month - 1] = element.adopted_animals

                    })

                    tmpSeries[0] = { name: "Machos", data: maleArray };
                    tmpSeries[1] = { name: "Hembras", data: maleArray };
                    if (mounted) {
                        setChartData({
                            options: chartData.options,
                            series: tmpSeries


                        })
                    }

                }

            } catch (error) {
                console.log(error)
            }
        }

        getRescuedAnimals()
        return () => {
        }
    }, [year])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza y exporta la lista de animales adoptados por año y clasificados por sexo">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Animales adoptados (por sexo)
                </Typography>
            </Stack>
            <FormControl >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age"
                    sx={{ borderRadius: 3, maxHeight: 42 }}
                    onChange={(val) => { setYear(val.target.value) }}
                >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>

        </Stack>

        <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="500"

        />
    </Card>


    )
}



const SterilizedAnimals = () => {

    const [chartData, setChartData] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },
            colors: ['#9C27B0', '#E91E63',],
            labels: ["Perros esterilizados", "Perros sin esterilizar"]


        },
        series: [
            99, 1
        ],
    })



    
    const [chartDataCats, setChartDataCats] = useState({


        options: {
            chart: {
                id: "basic-bar",
                locales: [{
                    "name": "en",
                    "options": {
                        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        "toolbar": {
                            "exportToSVG": "Descargar SVG",
                            "exportToPNG": "Descargar PNG",
                            "exportToCSV": "Descargar CSV",
                            "menu": "Menu",
                            "selection": "Selección",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                }],
            },
            xaxis: {
                categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },
            colors: ['#9C27B0', '#E91E63',],
            labels: ["Gatos esterilizados", "Gatos sin esterilizar"]


        },
        series: [
            99, 1
        ],
    })

    useEffect(() => {
        let mounted = true;


        const getSterilizedAnimals = async () => {
            try {
                let tmpSeries = chartData.series;

                const res = await axiosClient.get("/api/analytics/sterilized");
                console.log("Esterilizados", res.data)
                if (res.data.state) {

                    let dogs = (res.data.data.dogs * 100) / res.data.data.totalDogs;
                    let cats = (res.data.data.cats * 100) / res.data.data.totalCats;
                 
                    setChartData({ ...chartData, series: [dogs, 100 - dogs] })
                    // let female = res.data.data.female;

                    // let tmpSeries = []

                    // let maleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    // let femaleArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    // male.forEach((element, index) => {

                    //     maleArray[element.month - 1] = element.adopted_animals

                    // })


                    // female.forEach((element, index) => {

                    //     femaleArray[element.month - 1] = element.adopted_animals

                    // })

                    // tmpSeries[0] = { name: "Machos", data: maleArray };
                    // tmpSeries[1] = { name: "Hembras", data: maleArray };
                    // if (mounted) {
                    //     setChartData({
                    //         options: chartData.options,
                    //         series: tmpSeries


                    //     })
                    // }

                }

            } catch (error) {
                console.log(error)
            }
        }

        getSterilizedAnimals()
        return () => {
            mounted=false;
        }
    }, [])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza el porcenate de perros esterilizados con los que cuenta actualmente la fundación">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Esterilización de perros
                </Typography>
            </Stack>
        </Stack>

        <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width="300"


        />
    </Card>


    )
}