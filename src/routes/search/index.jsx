import { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "src/setup/firebase";
import {SearchQueryContext} from 'src/routes/root'


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
            where('title', '>=', searchQuery),
            where('title', '<',`${searchQuery}z`)
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

  return (
    <div>
      <h1>Home</h1>
      <h1>{searchQuery}</h1>

      {projects.map((project)=><h1 key={project.id}>{project.title}</h1>)}
    </div>  
  );
}

export default Search;
