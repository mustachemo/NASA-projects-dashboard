import ProjectCard from "src/components/projectCard";
import "./index.css";

function Home() {
  return (
    <div className="container">
      <div className="projects">
        <ProjectCard />
      </div>
      <div className="contributors">contributors</div>
    </div>
  );
}

export default Home;
