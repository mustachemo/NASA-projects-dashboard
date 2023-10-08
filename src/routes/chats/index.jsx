import { useEffect, useState, createContext } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "src/setup/firebase";
import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatCard from "./chatcard";
import Grid from '@mui/material/Grid'
import Item from '@mui/material/ListItem'
import { Outlet } from "react-router-dom";

export const ChatsContext = createContext()

function Chats() {
    const [user] = useAuthState(auth)
    const [chats, setChats] = useState([])
    function listenConversation(chatid) {
        let q = query(collection(db, "chats", chatid, "messages"), orderBy("time","desc"))
        onSnapshot(q, (querySnapshot) => {
            const newMessages = []
            querySnapshot.forEach((document) => {

                newMessages.push({
                    ...document.data(),
                    messageid: document.id
                })
            })
            setChats((chats)=>{
                const updatedChats = chats.map(
                    (chat)=> chat.chatid == chatid ? {...chat, messages:newMessages} : chat
                )
                return updatedChats
            })
        })}
    
    useEffect(()=>{
        if (!user) return;
        
        let q = query(collection(db, "chats"), where("members","array-contains",user.uid))
        onSnapshot(q, (querySnapshot) => {
            const newChats = []
            querySnapshot.forEach((document) => {
                const members = document.data().members
                
                newChats.push({
                    chatid: document.id,
                    userid: members.filter((uid)=>uid!=user.uid)[0],
                    messages: []
                })
                listenConversation(document.id)
            })
            setChats(newChats)
        }, err => {
            console.log(`Encountered error: ${err}`)
        })
  },[user])
  return (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            {chats.map((chat,index)=><Item key={index}><ChatCard chat={chat}/></Item>)}
        </Grid>
        <Grid item xs={8}>
            <Item>
                <ChatsContext.Provider value={chats}>
                    <Outlet/>
                </ChatsContext.Provider>
            </Item>
        </Grid>

    </Grid>
  )
}

export default Chats;
