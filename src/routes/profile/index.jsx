import { useParams } from "react-router";
import { db } from "src/setup/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MediaCard from "./profile";

function Profile() {
  const { userid } = useParams();
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserObj(docSnap.data());
      } else {
        console.log(`userid:${userid} not found`);
      }
    };
    getUser();
  }, [userid]);

  return (
    <div>
      {userObj ? <MediaCard /> : <></>}
    </div>
  );
}

export default Profile;
