import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
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
  const id = useParams();

  console.log(`id: ${id.userid}`);

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
            // image={user.photoURL}
            // title={user.displayName}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="card-name" style={{ textAlign: "center" }}>
            {/* {user.displayName} */}
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
                <strong>Bio:</strong>
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Location:</strong>
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Skills:</strong>
              </Typography>
            </CardContent>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
