import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { db } from "src/setup/firebase";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { auth } from "src/setup/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./index.css";

export default function ProjectCard() {
  const [projectsData, setProjectsData] = useState([]);
  const [currentUserUID, setCurrentUserUID] = useState(null);
  const [username, setUsername] = useState("");

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUID(user.uid);
      } else {
        setCurrentUserUID(null);
        setUsername(""); // Reset the username if user is not authenticated
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Effect to fetch username using UID
  useEffect(() => {
    async function fetchUser() {
      if (currentUserUID) {
        const userRef = doc(db, "users", currentUserUID); // Use `doc` instead of `collection`
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUsername(userSnap.data().name);
        } else {
          console.log("No such user!");
        }
      }
    }

    fetchUser();
  }, [currentUserUID]);

  // Effect to fetch projects using username
  useEffect(() => {
    async function fetchProjects() {
      if (username) {
        const q = query(collection(db, "projects"), where("associated_user", "==", username));

        const projectsSnapshot = await getDocs(q);
        const projectsArray = [];
        projectsSnapshot.forEach((doc) => {
          projectsArray.push({ id: doc.id, ...doc.data() });
        });

        setProjectsData(projectsArray);
      }
    }

    fetchProjects();
  }, [username]);

  return (
    <div>
      {projectsData.map((project, index) => (
        <Card key={index} sx={{ maxWidth: 345, boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.6)" }}>
          <CardMedia sx={{ height: 140 }} image={project.image} title={project.title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncateText(project.description, 100)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
