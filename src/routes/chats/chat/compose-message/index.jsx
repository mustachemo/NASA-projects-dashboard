import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { serverTimestamp } from 'firebase/firestore';

import { useState } from 'react';

import { db } from "src/setup/firebase";
import { addDoc, collection } from "firebase/firestore"

import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ComposeMessage(props) {
    const [message, setMessage] = useState()
    const [user] = useAuthState(auth)


    function handleSend() {
        event.preventDefault()
        const col = collection(db, 'chats', props.chatid, 'messages')
        console.log(col)
        const ref = addDoc(col, {
            text: message,
            sender: user.uid,
            time: serverTimestamp()
        })
        console.log(ref)
        setMessage('')
    }

    return (
        <FormControl required>
        <form
            onSubmit={handleSend}
        >
            <TextField
                placeholder="typemessage"
                onChange={(e)=>setMessage(e.target.value)}
            />
            <Button type='submit'>Send</Button>
        </form>
        </FormControl>
    )
}