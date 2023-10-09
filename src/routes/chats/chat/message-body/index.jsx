import { PropTypes } from 'prop-types';


import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function MessageBody (props) {
    if (props.message.time == undefined) return;
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.message.text}</Typography>
                <Typography>{props.message.time.toDate().toLocaleString()}</Typography>
            </CardContent>
        </Card>
    )
}

MessageBody.propTypes = {
    message: PropTypes.any.isRequired
}