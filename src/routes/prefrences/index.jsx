import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {db} from 'src/setup/firebase';
import {collection, getDoc, addDoc, updateDoc, doc} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/setup/firebase'; 
import { Navigate } from 'react-router-dom'; 



const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '70%',
  margin: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export default function UserProfileForm() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [skillsets, setSkillsets] = useState([]);
  const [currentUserUID, setCurrentUserUID] = useState(null);

  const [user] = useAuthState(auth);

  
    // // Redirect if user is not logged in
    // if (!user) {
    //     return <Navigate to="/" replace={true} />;
    // }
  const [skillsetOptions, setSkillsetOptions] = useState([]);

  const [isEditing, setIsEditing] = useState(true); // New state variable for editing mode


  const handleToggle = (event) => {
    setIsPrivate(event.target.checked);
  };

  useEffect(() => {
    if (user) {
      console.log("User is logged in");
      setCurrentUserUID(user.uid);
    } else {
      setCurrentUserUID(null);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserUID) {
        const docRef = doc(db, "users", currentUserUID);  // Corrected to 'firestore'
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUsername(docSnap.data().username);
        } else {
          console.log("No such document!");
        }
      }
    };
  
    fetchData();  // Call the inner function
  }, [currentUserUID]);

  useEffect(() => {
    const fetchSkillsets = async () => {
      const skillsetRef = doc(db, "Skillsets", "Tags");
      const snapshot = await getDoc(skillsetRef);
      if (snapshot.exists()) {
        const skillsetData = snapshot.data();
        console.log("Skillset Data:", skillsetData);
  
        // Transform the object into an array of objects with a name property
        const transformedSkillsets = Object.keys(skillsetData).map((key) => {
          return { name: skillsetData[key] };
        });
  
        setSkillsetOptions(transformedSkillsets);
      } else {
        console.log("No such document!");
      }
    };
    fetchSkillsets();
  }, []);
  
  
  

  const handleSubmit = async () => {
    const userData = {
      isPrivate,
      username,
      description,
      location,
      skillsets,
    };
  
    console.log("User Data for Firebase:", JSON.stringify(userData));
  
    // Document reference to the specific user
    const userDocRef = doc(db, 'users', currentUserUID);
  
    // Update the fields
    try {
      await updateDoc(userDocRef, userData);
      console.log("User data updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  

  return (
    <DemoPaper sx={{ justifyContent: 'center', display: 'flex' }}>
      {isEditing ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit();}}>
          <FormControlLabel
            control={
              <Switch checked={isPrivate} onChange={handleToggle} />
            }
            label="Keep my data private"
            sx={{ justifyContent: 'center', display: 'flex' }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" value={username} onChange={e => setUsername(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="description"
              label="User Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="location">Location</InputLabel>
            <Input id="location" value={location} onChange={e => setLocation(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="skillset-label">Skillset</InputLabel>
            <Select
              labelId="skillset-label"
              id="skillset"
              multiple
              value={skillsets}
              onChange={e => setSkillsets(e.target.value)}
            >
              {skillsetOptions.map((option, index) => (
                <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
              ))}

            </Select>

            <FormHelperText>Select your primary skillsets</FormHelperText>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
        ): 
        (
        <div>
          <h2>{username}</h2>
          <p>{description}</p>
          <p>{location}</p>
          <p>{skillsets.join(', ')}</p>
          <p>{isPrivate ? 'Private' : 'Public'}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </DemoPaper>
  );
}