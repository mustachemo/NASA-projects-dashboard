import Typography from '@mui/material/Typography'
import ListItem from "@mui/material/ListItem";


export default function RightMessage(props) {
    return (
    <ListItem>{props.message.text}R</ListItem>
    )
}