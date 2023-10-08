import { useState, useEffect } from "react";

import { db } from "src/setup/firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { auth } from "src/setup/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProjectCard from "src/components/projectCard";

import "./index.css";

export default function ProjectCards() {
  const [projectsData, setProjectsData] = useState([]);
  const [currentUserUID, setCurrentUserUID] = useState(null);
  const [username, setUsername] = useState("");

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
        const q = query(
          collection(db, "projects"),
          where("associated_user", "==", username)
        );

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
    <div className="project-cards">
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
