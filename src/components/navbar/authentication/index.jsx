
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/setup/firebase';
import Button from '@mui/material/Button';
import UserProfile from './userprofile';

export default function Authentication() {
  const [user] = useAuthState(auth);
  return <>
    {user ? <UserProfile /> : <Button color='inherit'>Login</Button>}
  </>
}