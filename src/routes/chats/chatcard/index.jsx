import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import PublicUserWheel from 'src/components/public-user-wheel';
import {db} from 'src/setup/firebase'
import { Link } from 'react-router-dom';

export default function ChatCard(props) {
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
    {user ? <PublicUserWheel publicuser={user}/> : <></>}
    <Link to={`/chats/${props.chat.chatid}`}>View</Link>
    </>
        
    )
}

ChatCard.propTypes = {
    chat: PropTypes.any.isRequired
}