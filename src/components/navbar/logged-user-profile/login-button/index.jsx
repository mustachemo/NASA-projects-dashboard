import Button from "@mui/material/Button";
import { auth } from "src/setup/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function LoginButton() {
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <Button color="inherit" onClick={signIn}>
      Login
    </Button>
  );
}
