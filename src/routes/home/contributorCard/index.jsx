import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { db } from "src/setup/firebase";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";

export default function ContributorCard() {
  const [contributorsData, setContributorsData] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const contributors = [];
      querySnapshot.forEach((doc) => {
        contributors.push(doc.data());
      });
      setContributorsData(contributors);
    }

    fetchContributors();
  });

  return (
    <div>
      {contributorsData.map((contributor) => (
        <Card key={contributor.id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {contributor.photoURL}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={contributor.username}
            subheader={contributor.email}
          />
        </Card>
      ))}
    </div>
  );
}
