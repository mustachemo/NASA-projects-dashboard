import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/setup/firebase";

export default function MediaCard() {
  const id = useParams();
  const [userObj, setUserObj] = useState(null);

  console.log(`id: ${id.userid}`);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", id.userid);
      const docSnap = await getDoc(docRef);
      console.log(`docSnap: ${docSnap}`);

      if (docSnap.exists()) {
        setUserObj(docSnap.data());
      } else {
        console.log(`userid:${id.userid} not found`);
      }
    };
    getUser();
  }, [id.userid]);

  return (
    <div className="profile-container">
      {userObj && ( // Add this conditional check
        <Card sx={{ maxWidth: 345 }} className="card-container">
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
            <CardMedia sx={{ height: 100, width: 100, borderRadius: "50%" }} image={userObj.photoURL} />
          </Box>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="card-name" style={{ textAlign: "center" }}>
              {userObj.name}
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
                  <strong>Email: </strong>
                  {!userObj.isPrivate ? userObj.email : ""}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Location: </strong> {userObj.location ? userObj.location : ""}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Username: </strong> {userObj.username ? userObj.username : ""}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>Skills: </strong>
                  {userObj.skillsets ? (
                    <ul>
                      {userObj.skillsets.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </Typography>
              </CardContent>
            </Box>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      )}
    </div>
  );
}
