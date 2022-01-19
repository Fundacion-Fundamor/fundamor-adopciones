import React, { useState } from "react";
import { Collapse, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi"
import { useHistory } from "react-router-dom";
import { grey } from "@mui/material/colors";

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
                    '&:hover': {
                        background: theme.custom.primary.light,
                        color: theme.custom.primary.dark,
                        fontWeight: 300
                    },
                    marginLeft: 2, marginRight: 2, borderRadius: 3, mb: 1,

                    maxWidth: "227px;"
                }}
            >

                {(dataItem.icon)}

                <ListItemText sx={{ marginLeft: 3 }} primary={dataItem.name} />
                {aux ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
            </ListItem>
            <Collapse in={aux} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ mb: 1 }}>
                    {dataItem.children.map((obj, index) => {
                        return <ChildItem key={index} dataItem={obj} />
                    })}
                </List>
            </Collapse>
        </>
    )
}

const ChildItem = (props) => {
    const { dataItem} = props;
    const theme = useTheme();

    const history = useHistory();
    const handleHistory = (to) => history.push(to);

    return (
        <ListItem button onClick={() => handleHistory(dataItem.path)} sx={{
            backgroundColor: "white",
            '&:hover': {
                background: "white",
                color: theme.custom.primary.dark,
                fontWeight: 300
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