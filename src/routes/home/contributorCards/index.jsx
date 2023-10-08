import { useState, useEffect } from "react";

import { db, auth } from "src/setup/firebase";

import { collection, getDocs, query } from "firebase/firestore";
import UserCard from 'src/components/userCard';

import "./index.css";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ContributorCard() {
  const [contributorsData, setContributorsData] = useState([]);
  const [user] = useAuthState(auth)

  useEffect(() => {
    async function fetchContributors() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const contributors = [];
      querySnapshot.forEach((doc) => {
        contributors.push({ uid: doc.id, ...doc.data() });
      });
      setContributorsData(contributors);
    }

    fetchContributors();
  });

  return (
    <div>
        {contributorsData.map((contributor) => (
            <UserCard key={contributor.uid} user={contributor} loggedin={contributor.uid===user.uid}/>
        ))}
    </div>
  );
}
