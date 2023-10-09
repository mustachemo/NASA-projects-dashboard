import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import UserCard from 'src/components/userCard';
import {db} from 'src/setup/firebase'

import './index.css'

export default function ChatCard(props) {
    const params = useParams()
    const [user, setUser] = useState()
    useEffect(()=>{
      if (!props.chat.userid) return;
      const getUser = async () => {
        const docRef = doc(db, "users", props.chat.userid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setUser({
              ...docSnap.data(), uid:props.chat.userid
          })
        } else {
          console.log(`userid:${props.chat.userid} not found`)
        }
      }
      getUser()
    }, [props.chat.userid])
    
    return ( <>
    {params.chatid == props.chat.chatid ? <div className='spacer'></div> : <></>}
    {user ? <UserCard
      link={`/chats/${props.chat.chatid}`}
      user={user}/> : <></>
    }
    </>
        
    )
}

ChatCard.propTypes = {
    chat: PropTypes.any.isRequired
}