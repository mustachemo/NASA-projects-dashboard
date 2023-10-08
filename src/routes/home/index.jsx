import ProjectCard from "src/routes/home/projectCard";
import ContributorCards from "src/routes/home/contributorCards";
import "./index.css";

function Home() {
  return (
    <div className="container">
      <div className="projects">
        <ProjectCard />
      </div>
      <div className="contributors">
        <ContributorCards />
      </div>
    </div>
  );
}

export default Home;
