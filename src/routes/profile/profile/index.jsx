import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { auth } from "src/setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/setup/firebase";

export default function MediaCard() {
  const [user] = useAuthState(auth);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.description || ""); // "apples"
          setLocation(data.location || ""); // "modesto ca"
          setSkills(data.skillsets || []); // ["C++"]
        } else {
          console.log("No such document!");
        }
      };

      fetchData();
    }
  }, [user]);

  if (!user) return <></>;

  const handleSave = () => {
    // Here you can send the updated profile information (bio, location, skills) to your database.
    console.log("Bio:", bio);
    console.log("Location:", location);
    console.log("Skills:", skills);
  };

  return (
    <div
      className="profile-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Card sx={{ maxWidth: 345 }} className="card-container">
        <Box display="flex" justifyContent="center" alignItems="center">
          <CardMedia
            sx={{ height: 100, width: 100, borderRadius: "50%" }}
            image={user.photoURL}
            title={user.displayName}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="card-name" style={{ textAlign: "center" }}>
            {user.displayName}
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off">
            <CardContent>
              <Typography variant="body1" component="p">
                <strong>Bio:</strong> {bio}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Location:</strong> {location}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Skills:</strong> {skills.join(", ")}
              </Typography>
            </CardContent>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
