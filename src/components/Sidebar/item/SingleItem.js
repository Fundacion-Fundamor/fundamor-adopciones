import React, { useContext } from "react"
import { ListItem, ListItemText, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import BreadCumbContext from "../../../context/breadcumb/breadcumbContext";


export default function SingleItem(props) {
    const { dataItem } = props;
    const theme = useTheme();
    const { selectPage, currentPage } = useContext(BreadCumbContext);

    const history = useHistory();
    const handleHistory = (to) => history.push(to);



    return (
        <ListItem button onClick={() => {
            
            selectPage(props.index)
            handleHistory(dataItem.path)
        
        }}

            selected={currentPage === props.index}
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
                maxWidth: "227px;"
            }}>

            {(dataItem.icon)}

            <ListItemText sx={{ marginLeft: 3, fontWeight: 900 }} primary={dataItem.name} />
        </ListItem>
    )
}