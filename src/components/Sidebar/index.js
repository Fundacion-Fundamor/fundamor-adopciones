import {
    Box,
    Drawer,
    List,
    useMediaQuery,
    useTheme
} from "@mui/material";


import SingleItem from "./item/SingleItem";
import CollapseItem from "./item/CollapseItem";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { userRouters } from "../../routes/userRoutes";


const drawerWidth = 260;
export default function SideBar(props) {
    const { open = true, handleDrawer } = props;

    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{
            display: 'flex',
            fontFamily: "Nunito",
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            width: open && matchUpMd ? "260px" : "0px",
            // backgroundColor: "blue"
        }}>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        marginTop: { xs: '0', md: '64px' }
                        // ,backgroundColor: red[50]
                    },
                    fontFamily: "Nunito"
                }}
                ModalProps={{ keepMounted: true }}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={open}
                onClose={() => handleDrawer()}
                elevation={0}
            >
                <PerfectScrollbar style={{
                    // height: 'calc(25vh - 88px)',
                    // backgroundColor:"red" 
                }}>

                    <List
                        sx={{
                            '& .MuiListItemButton-root': {
                                mt: 0.5
                            },
                            '& .Mui-selected': {
                                background: theme.custom.primary.light,
                                backgroundColor: theme.custom.primary.light,
                                color: "white",
                                '& .MuiListItemIcon-root': {
                                    color: "white",
                                },
                                '& .MuiTypography-body1':{
                                    color: "white",
                                }
                            },
                            '& .Mui-selected:hover': {
                                background: theme.custom.primary.light,
                                color: "white",
                                '& .MuiListItemIcon-root': {
                                    color: "white",
                                },
                            }
                        }}
                    
                    >
                        {userRouters.map((obj, index) => {
                            if (obj.children !== undefined) {
                                return (
                                    <CollapseItem key={index} dataItem={obj} index={index+3} />
                                )
                            } else {
                                return <SingleItem key={index} dataItem={obj} index={index+3} />
                            }
                        }
                        )}
                    </List>
                    {/*<Divider />*/}

                </PerfectScrollbar>

            </Drawer>

        </Box>
    );
}