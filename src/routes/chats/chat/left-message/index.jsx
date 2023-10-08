import Typography from '@mui/material/Typography'

export default function LeftMessage(props) {
    return (<li>
        {props.message.text}L
    </li>)
}