import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Typography from "@mui/material/Typography";
import PublicUserWheel from "src/components/public-user-wheel";

import LoggedUserWheel from "src/components/logged-user-wheel"

import "./index.css";

export default function userCard(props) {

  return (
    <Card key={props.user.uid} sx={{ maxWidth: 345 }}>
      <CardHeader
        className="props.user-card-link"
        // avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.user.photoURL}></Avatar>}
        avatar={props.loggedin ? <LoggedUserWheel/> : <PublicUserWheel publicuser={props.user} /> }
        title={<Typography color="black">{props.user.username}</Typography>}
        subheader={props.user.email}
      />
    </Card>
  );
}
