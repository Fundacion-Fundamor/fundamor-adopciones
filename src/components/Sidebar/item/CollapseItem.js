import React, { useState } from "react";
import { Collapse, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi"
import { useHistory } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import BreadCumbContext from "../../../context/breadcumb/breadcumbContext";

/**Item que contiene mas items en el sidebar
 * 
 * @param {*} props 
 * @returns 
 */
export default function CollapseItem(props) {
    const { dataItem } = props;
    const theme = useTheme();

    const [aux, setAux] = useState(false);
    const handleAux = () => {
        setAux(!aux)
    }
    return (
        <>
            <ListItem button onClick={() => handleAux()}
                sx={{
                    backgroundColor: "white",
                    color: theme.custom.secondary.dark,
                    '&:hover': {
                        '& .MuiTypography-body1': {
                            color: "white",
                        },
                        color: "white",
                        background: theme.custom.primary.light,
                    },
                    '& .MuiTypography-body1': {
                        fontWeight: 700,
                    },
                    marginLeft: 2, marginRight: 2, borderRadius: 3, mb: 1,

                    maxWidth: "227px;" ,
                 
                }}
            >

                {(dataItem.icon)}

                <ListItemText sx={{ marginLeft: 3 }} primary={dataItem.name} />
                {aux ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
            </ListItem>
            <Collapse in={aux} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{
                    '& .MuiListItemButton-root': {
                        mb: 1,
                        background: "white"
                    }, '& .Mui-selected': {
                        background: "white !important",
                        color: theme.custom.primary.light,
                        '& .MuiListItemIcon-root': {
                            background: "white",
                            color: theme.custom.primary.light,
                        },
                        '& .MuiTypography-body1': {

                            color: theme.custom.primary.light,
                        }
                    },
                    '& .Mui-selected:hover': {
                        background: "white",
                     
                        '& .MuiListItemIcon-root': {
                            color: "white",
                        },
                    }

                }}




                >
                    {dataItem.children.map((obj, index) => {
                        return <ChildItem key={index} dataItem={obj} subIndex={props.index + "." + index} />
                    })}
                </List>
            </Collapse>
        </>
    )
}

const ChildItem = (props) => {
    const { dataItem } = props;
    const theme = useTheme();

    const history = useHistory();
    const handleHistory = (to) => history.push(to);
    const { selectPage, currentPage } = useContext(BreadCumbContext);

    return (
        <ListItem button

            selected={currentPage === props.subIndex}
            onClick={() => {

                selectPage(props.subIndex)
                handleHistory(dataItem.path)
            }}
            sx={{

                backgroundColor: "white",
                '&:hover': {
                    background: "white",
                    color: theme.custom.primary.light,
                    fontWeight: 300,
                    '& .MuiTypography-body1': {
                        color: theme.custom.primary.light,

                    }

                },
                marginLeft: 5,
                borderLeftWidth: 1,
                borderStyle: "solid",
                marginRight: 2,
                borderColor: grey[200],
                maxWidth: "197px;"
            }}>

            {(dataItem.icon)}

            <ListItemText sx={{ marginLeft: 3 }} primary={dataItem.name} />
        </ListItem>
    )
}