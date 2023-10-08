import ProjectCards from "src/routes/home/projectCards";
import ContributorCards from "src/routes/home/contributorCards";
import "./index.css";

function Home() {
  return (
    <div className="container">
      <div className="projects">
        <ProjectCards />
      </div>
      <div className="contributors">
        <ContributorCards />
      </div>
    </div>
  );
}

export default Home;
