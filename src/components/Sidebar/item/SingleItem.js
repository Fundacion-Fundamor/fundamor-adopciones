import { ListItem, ListItemText, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";


export default function SingleItem(props) {
    const { dataItem} = props;
    const theme = useTheme();

    const history = useHistory();
    const handleHistory = (to) => history.push(to);

    return (
        <ListItem button onClick={() => handleHistory(dataItem.path)} sx={{
            backgroundColor: "white",
            '&:hover': {
                background: theme.custom.primary.light,
                color: theme.custom.primary.dark,
                fontWeight: 300
            },
            marginLeft: 2, marginRight: 2, borderRadius: 3, mb: 1,

            maxWidth: "227px;"
        }}>

            {(dataItem.icon)}

            <ListItemText sx={{ marginLeft: 3 }} primary={dataItem.name} />
        </ListItem>
    )
}