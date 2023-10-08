import ProjectCard from "src/routes/home/projectCard";
import ContributorCard from "src/routes/home/contributorCard";
import "./index.css";

function Home() {
  return (
    <div className="container">
      <div className="projects">
        <ProjectCard />
      </div>
      <div className="contributors">
        <ContributorCard />
      </div>
    </div>
  );
}

export default Home;
