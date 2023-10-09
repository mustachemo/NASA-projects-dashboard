import { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs, or, and } from "firebase/firestore";
import { db } from "src/setup/firebase";
import {SearchQueryContext} from 'src/routes/root'
import ProjectCard from 'src/components/ProjectCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import './index.css'

function Search() {
  const [projects, setProjects] = useState([])
  const {searchQuery} = useContext(SearchQueryContext)
  useEffect(()=>{
    const getProjects = async () => {
      let q;
      switch (searchQuery) {
        case '':
          q = query(collection(db, "projects"))
          break;
        default:
          q = query(
            collection(db, "projects"),
            or(
              and(where('title', '>=', searchQuery),
              where('title', '<',searchQuery + 'z')),
              and(where('title', '>=', searchQuery.toUpperCase()),
              where('title', '<',searchQuery.toUpperCase() + 'z')),
              and(where('title', '>=', searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)),
              where('title', '<', searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)+ 'z'))
              )
          )
      }
      
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
  },[searchQuery])

  return (<>
    <Typography variant="h1">Results...</Typography>
    <Box className="results">
      {projects.map((project)=>
        <ProjectCard className="result" key={project.id} project={project} />
      )}
    </Box>  
    </>);
}

export default Search;
