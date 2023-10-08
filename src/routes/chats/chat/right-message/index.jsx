import { PropTypes } from 'prop-types';


import LoggedUserWheel from 'src/components/logged-user-wheel';
import MessageBody from '../message-body';


export default function RightMessage(props) {
    return (
        <>
            <LoggedUserWheel />
            <MessageBody message={props.message} />
        </>
    )
}
RightMessage.propTypes = {
    message: PropTypes.any.isRequired
}