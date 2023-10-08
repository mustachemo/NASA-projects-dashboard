import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MediaCard() {
    const [user] = useAuthState(auth);
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');

    if (!user) return <></>;

    const handleSave = () => {
        // Here you can send the updated profile information (bio, location, skills) to your database.
        console.log('Bio:', bio);
        console.log('Location:', location);
        console.log('Skills:', skills);
    };

    return (
        <div className='profile-container' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Card sx={{ maxWidth: 345}} className='card-container'>
            <Box display="flex" justifyContent="center" alignItems="center">
                <CardMedia
                    sx={{ height: 100, width: 100, borderRadius: '50%' }}
                    image={user.photoURL}
                    title={user.displayName}
                />
            </Box>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='card-name' style={{ textAlign: 'center' }}>
                        {user.displayName}
                    </Typography>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="bio"
                            label="Bio"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={{ width: '250px' }}
                        />
                        <TextField
                            id="location"
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ width: '250px' }}
                        />
                        <TextField
                            id="skills"
                            label="Skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            style={{ width: '250px' }}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSave} >Save</Button>
                </CardActions>
            </Card>
        </div>
    );
}
