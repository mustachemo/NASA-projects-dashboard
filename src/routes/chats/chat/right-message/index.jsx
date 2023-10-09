import { PropTypes } from 'prop-types';


import LoggedUserWheel from 'src/components/logged-user-wheel';
import MessageBody from '../message-body';


export default function RightMessage(props) {
    return (
        <>
            <MessageBody message={props.message} />
            <LoggedUserWheel />
        </>
    )
}
RightMessage.propTypes = {
    message: PropTypes.any.isRequired
}