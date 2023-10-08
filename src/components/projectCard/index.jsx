import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

import "./index.css";

export default function ProjectCard(props) {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.6)" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.project.imageURL}
        title={props.project.title}
      />
      <CardContent className="project-card-content">
        <Typography gutterBottom variant="h5" component="div">
          {props.project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateText(props.project.description, 100)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
};
