import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import { db } from "src/setup/firebase";
import Typography from "@mui/material/Typography";
import { collection, getDocs, query } from "firebase/firestore";

import "./index.css";

export default function ContributorCard() {
  const [contributorsData, setContributorsData] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const contributors = [];
      querySnapshot.forEach((doc) => {
        contributors.push({ id: doc.id, ...doc.data() });
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
            component={Link}
            to={`profile/${contributor.id}`}
            className="contributor-card-link"
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={contributor.photoURL}></Avatar>}
            title={<Typography color="black">{contributor.username}</Typography>}
            subheader={contributor.email}
          />
        </Card>
      ))}
    </div>
  );
}
