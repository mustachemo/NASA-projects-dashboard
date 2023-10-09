import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatsContext } from ".."

import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Navigate } from "react-router-dom";

import { db } from "src/setup/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore"

import List from "@mui/material/List";
import RightMessage from "./right-message";
import LeftMessage from "./left-message";
import ComposeMessage from "./compose-message";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography"

import './index.css'

export default function Chat() {
    const [user] = useAuthState(auth)
    const [messagedUser, setMessagedUser] = useState()

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
                return;
            } else {
                setRedirect(currChat.chatid)
            }
        }
        
        if (currChat.messages == undefined) {
            setMessages([])
            return;
        }
        setMessages(currChat.messages)
    }, [param, user, chats])

    useEffect(()=>{
        if (!param.chatid) return;
        if (chats.length == 0) return;
        
        let currChat = chats.find((chat) => chat.chatid === param.chatid)
        if (currChat == undefined) return;

        const getUser = async () => {
          const docRef = doc(db, "users", currChat.userid);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setMessagedUser({
                ...docSnap.data(), uid:docSnap.uid
            })
          } else {
            console.log(`userid:${currChat.userid} not found`)
          }
        }
        getUser()
      }, [messages])

    const dispMessages = messages.map((message, index)=>
        (message.sender == user.uid) ?
        <ListItem className="message right" key={index.toString()}>
            <RightMessage  message={message} user={user}/>
        </ListItem> :
        <ListItem className="message left" key={index.toString()}>
            <LeftMessage message={message} user={messagedUser}/>
        </ListItem>
    )

    return (<>
        <List className="messages">
            <ListItem className="compose-message"><ComposeMessage chatid={param.chatid}/></ListItem>
            {messages.length==0 ?<ListItem><Typography>This is your first message...</Typography></ListItem> : <></>}
            {dispMessages}
        </List>
        
        { redirect ? (<Navigate push to={`/chats/${redirect}`} replace={true}/>) : null }
    </>)
}