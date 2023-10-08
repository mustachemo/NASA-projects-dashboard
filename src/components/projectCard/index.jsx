import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { firestore } from "src/setup/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function ProjectCard() {
  const projects = await getDocs(collection(firestore, "projects"));
  projects.forEach((doc) => {
    console.log(`${doc.title} => ${doc.data()}`);
  });

  return (
    <div>
      {projects.map((project, index) => (
        <Card key={index} sx={{ maxWidth: 345, boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.6)" }}>
          <CardMedia sx={{ height: 140 }} image={project.image} title={project.title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
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
