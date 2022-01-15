/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardContent, CssBaseline, FormControl, IconButton, MenuItem, Select, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, } from 'react'
import { useTheme } from '@mui/material/styles';
import { grey, } from '@mui/material/colors';
import axiosClient from '../../config/axios';

import { FaHandsHelping, FaRegClock } from 'react-icons/fa';
import { IoMedkitOutline } from 'react-icons/io5';
import Chart from "react-apexcharts";
import { BiHelpCircle } from 'react-icons/bi';
export default function Dashboard() {


    const matchDownSm = useMediaQuery('(max-width:1280px)');


    return (


        <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column", maxWidth: "1466px" }}>
            <CssBaseline />
            <Stack direction={"row"} display={"flex"} alignItems={"flex-start"} justifyContent={"center"} gap={2} flexWrap={"wrap"}>


                <Stack direction={matchDownSm ? "column" : "row"} justifyContent={"space-evenly"} display={"flex"} sx={{ width: "100%" }}>

                    <CardAnimalsAdopted />
                    <CardAnimalsRescued />
                    <CardAnimalsWaiting />


                </Stack>
                <Stack direction={matchDownSm ? "column" : "row"} justifyContent={"space-evenly"} display={"flex"} width={"100%"}>
                    <SterilizedAnimals />
                    <DewormedAnimals />
                </Stack>
                <Stack direction={matchDownSm ? "column" : "row"} justifyContent={"space-evenly"} display={"flex"} width={"100%"}>
                    <AdoptedAnimalsChart />
                    <RescuedAnimalsChart />
                </Stack>
                <Stack direction={matchDownSm ? "column" : "row"} justifyContent={"space-evenly"} display="flex" width={"100%"}>
                    <AdoptedAnimalsChartPerGender />
                    <RescuedAnimalsChartPerGender />
                </Stack>

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
                if (mounted) {
                    if (res.data.state) {

                        setNumber(res.data.data)

                    }
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
            borderColor: "#512da8",
            marginY: 1
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
                if (mounted) {
                    if (res.data.state) {

                        setNumber(res.data.data)
                    }
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
            borderColor: "#d32f2f",
            marginY: 1
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
                if (mounted) {
                    if (res.data.state) {

                        setNumber(res.data.data)
                    }

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
            borderColor: "#1e88e5",
            marginY: 1
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


    const matchDownSm = useMediaQuery('(max-width:1280px)');
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

                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/rescuedAnimals?year=" + year);
        
                if (res.data.state) {

                    let rescuedCats = res.data.data.cats;
                    let rescuedDogs = res.data.data.dogs;
                    let tmpSeries = []

                    let dogsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let catsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    rescuedDogs.forEach((element, index) => {

                        dogsArray[element.rescue_month - 1] = element.rescued_animals

                    })

                    rescuedCats.forEach((element, index) => {

                        catsArray[element.rescue_month - 1] = element.rescued_animals

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
            mounted=false;
        }
    }, [year])

    useEffect(() => {
        console.log("asadasd", chartData)
    }, [chartData.series])


    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, width: "100%", marginX: matchDownSm ? 0 : 2 }} >

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
            <FormControl sx={{ minWidth: 90 }} >
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
        // width="500"

        />
    </Card >


    )
}

const RescuedAnimalsChartPerGender = () => {

    const matchDownSm = useMediaQuery('(max-width:1280px)');
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
            mounted=false
        }
    }, [year])


    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, width: "100%", marginX: matchDownSm ? 0 : 2 }} >

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
            <FormControl sx={{ minWidth: 90 }} >

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
        // width="500"

        />
    </Card>


    )
}
const AdoptedAnimalsChart = () => {

    const [year, setYear] = useState(new Date().getFullYear());
    const matchDownSm = useMediaQuery('(max-width:1280px)');

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

                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/adoptedAnimals?year=" + year);
              
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
            mounted=false
        }
    }, [year])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, display: "flex", flexDirection: "column", width: "100%", marginX: matchDownSm ? 0 : 2, marginBottom: matchDownSm ? 2 : 0 }} >

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
            <FormControl sx={{ minWidth: 90 }}>
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
        // width="500"

        />
    </Card>


    )
}



const AdoptedAnimalsChartPerGender = () => {

    const [year, setYear] = useState(new Date().getFullYear());

    const matchDownSm = useMediaQuery('(max-width:1280px)');


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
                setChartData({ ...chartData, series: [] })
                const res = await axiosClient.get("/api/analytics/adoptedAnimalsPerGender?year=" + year);
               
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
            mounted=false
        }
    }, [year])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, width: "100%", marginX: matchDownSm ? 0 : 2, marginBottom: matchDownSm ? 2 : 0 }} >

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
            <FormControl sx={{ minWidth: 90 }} >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Age"
                    sx={{ borderRadius: 3, maxHeight: 42, }}
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
        // width="500"


        />
    </Card>


    )
}



const SterilizedAnimals = () => {


    const matchDownSm = useMediaQuery('(max-width:1280px)');

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
            colors: ['#43a047', '#ffeb3b',],
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
                const res = await axiosClient.get("/api/analytics/sterilized");
                console.log("Esterilizados", res.data)
                if (res.data.state) {

                    if (mounted) {
                        setChartData({ ...chartData, series: [res.data.data.dogs, res.data.data.totalDogs - res.data.data.dogs] })
                        setChartDataCats({ ...chartDataCats, series: [res.data.data.cats, res.data.data.totalCats - res.data.data.cats] })
                    }

                }

            } catch (error) {
                console.log(error)
            }
        }

        getSterilizedAnimals()
        return () => {
            mounted = false;
        }
    }, [])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, mt: 1, width: "100%", height: "100%", marginX: matchDownSm ? 0 : 2, marginBottom: matchDownSm ? 2 : 0 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza el porcenate de perros y gatos esterilizados con los que cuenta actualmente la fundación">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Esterilización de animales
                </Typography>
            </Stack>
        </Stack>

        <Stack direction={"column"} justifyContent={"space-around"} alignItems={"center"}>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="donut"
            // width="300"

            />
            <Chart
                options={chartDataCats.options}
                series={chartDataCats.series}
                type="donut"
            // width="300"
            />

        </Stack>
    </Card>


    )
}



const DewormedAnimals = () => {

    const matchDownSm = useMediaQuery('(max-width:1280px)');

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
            labels: ["Perros desparasitados", "Perros sin desparasitar"]


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
            colors: ['#43a047', '#ffeb3b',],
            labels: ["Gatos desparasitados", "Gatos sin desparasitar"]


        },
        series: [
            99, 1
        ],
    })

    useEffect(() => {

        let mounted = true;

        const getSterilizedAnimals = async () => {
            try {
                const res = await axiosClient.get("/api/analytics/dewormed");
                console.log("Esterilizados", res.data)
                if (res.data.state) {



                    if (mounted) {
                        setChartData({ ...chartData, series: [res.data.data.dogs, res.data.data.totalDogs - res.data.data.dogs] })
                        setChartDataCats({ ...chartDataCats, series: [res.data.data.cats, res.data.data.totalCats - res.data.data.cats] })
                    }

                }

            } catch (error) {
                console.log(error)
            }
        }

        getSterilizedAnimals()
        return () => {
            mounted = false;
        }
    }, [])




    return (<Card variant='outlined' sx={{ borderRadius: 4, p: 4, pb: 8, mt: 1, width: "100%", height: "100%", marginX: matchDownSm ? 0 : 2, marginBottom: matchDownSm ? 2 : 0 }} >

        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
            <Stack direction={"row"} alignItems={"center"}>

                <Tooltip title="Visualiza el porcenate de perros y gatos desparasitados con los que cuenta actualmente la fundación">
                    <IconButton>
                        <BiHelpCircle />
                    </IconButton>

                </Tooltip>
                <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                    Desparasitación de animales
                </Typography>
            </Stack>
        </Stack>

        <Stack direction={"column"} justifyContent={"space-around"} alignItems={"center"}>

            <Chart
                options={chartData.options}
                series={chartData.series}
                type="donut"
            />
            <Chart
                options={chartDataCats.options}
                series={chartDataCats.series}
                type="donut"
            />
        </Stack>

    </Card>


    )
}