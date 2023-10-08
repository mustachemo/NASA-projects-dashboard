import { PropTypes } from 'prop-types';

import PublicUserWheel from 'src/components/public-user-wheel'
import MessageBody from '../message-body';

export default function LeftMessage(props) {
    return (
        <>
           {props.user ? <PublicUserWheel publicuser={props.user}/>:<>Loading</>}
            <MessageBody message={props.message} />
        </>
    )
}

LeftMessage.propTypes = {
    user: PropTypes.any.isRequired,
    message: PropTypes.any.isRequired
}