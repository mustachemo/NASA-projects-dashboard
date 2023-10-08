
import ProjectCard from "src/components/projectCard";
import "./index.css";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "src/setup/firebase";

function Home() {
  const [projects, setProjects] = useState([])
  
  useEffect(()=>{
    const getProjects = async () => {
      const q = query(collection(db, "projects"));
      const newProjects = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const newProject = {
          ...doc.data(),
          id : doc.id
        }
        newProjects.push(newProject)
      })
      setProjects(newProjects)
    }
    getProjects()
  },[])

  return (
// <<<<<<< feature/main-page
//     <div className="container">
//       <div className="projects">
//         <ProjectCard />
//       </div>
//       <div className="contributors">contributors</div>
//     </div>
    <div>
      <h1>Home</h1>

      {projects.map((project)=><h1 key={project.id}>{project.title}</h1>)}
    </div>  
  );
}

export default Home;
