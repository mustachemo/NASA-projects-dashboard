
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/setup/firebase';

import LoggedUserWheel from './logged-user-wheel';
import LoginButton from './login-button'

export default function LoggedUserProfile() {
  const [user] = useAuthState(auth);
  return <>
    {user ? <LoggedUserWheel /> : <LoginButton/>}
  </>
}