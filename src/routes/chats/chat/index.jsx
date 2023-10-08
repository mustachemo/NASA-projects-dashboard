import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatsContext } from ".."

import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Navigate } from "react-router-dom";

import { db } from "src/setup/firebase";
import { addDoc, collection } from "firebase/firestore"

import RightMessage from "./right-message";
import LeftMessage from "./left-message";
import ComposeMessage from "./compose-message";

export default function Chat() {
    const [user] = useAuthState(auth)

    const chats = useContext(ChatsContext)
    const param = useParams()
    const [messages, setMessages] = useState([])
    const [redirect, setRedirect] = useState('')

    useEffect(()=>{
        if (param.chatid == redirect) setRedirect('');
        if (chats.length == 0) return;
        if (!user) return;
        let currChat = chats.find((chat) => chat.chatid === param.chatid)
        async function makeChat () {
            const ref = await addDoc(collection(db, 'chats'), {members:[param.chatid, user.uid]})
            setRedirect(ref.id)
        }
        if (currChat == undefined) {
            currChat = chats.find((chat) => {return chat.userid == param.chatid})
            if (currChat == undefined) {
                makeChat()
            } else {
                setRedirect(currChat.chatid)
            }
        }
        
        if (currChat.messages == undefined) return;
        setMessages(currChat.messages)
    },[param, user, chats])

    const dispMessages = messages.map((message, index)=>

            (message.sender == user.uid) ?
            <RightMessage key={index.toString()} message={message}/> :
            <LeftMessage key={index.toString()} message={message}/>

    )

    return (<>
        <ul>
            {dispMessages}
        </ul>
        <ComposeMessage chatid={param.chatid}/>
        { redirect ? (<Navigate push to={`/chats/${redirect}`}/>) : null }
    </>)
}