import { useParams } from "react-router";

function Profile() {
  const {userid} = useParams()
  

  return (
    <div>
      <h1>Profile</h1>
      <p>{userid}</p>
    </div>
  );
}

export default Profile;
