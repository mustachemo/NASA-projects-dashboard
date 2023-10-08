import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatsContext } from ".."

import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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

    useEffect(()=>{
        if (!user) return;
        const currChat = chats.find((chat) => chat.chatid === param.chatid)
        if (currChat == undefined) { //create chat
            // addDoc(collection(db, 'chats'), {members:[param.chatid, user.uid]})
            return;
        }
        
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
    </>)
}