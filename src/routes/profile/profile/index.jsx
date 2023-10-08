import * as React from 'react';
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

import './index.css';


export default function MediaCard() {
    const [user] = useAuthState(auth);
    if (!user) return <></>;
    return (
        <div className='profile-container'>
            <Card sx={{ maxWidth: 345 }} className='card-container'>
            <CardMedia
                sx={{ height: 140 }}

                image= {user.photoURL}
                title= {user.displayName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className='card-name'>
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
                        id="multiline-basic"
                        label="Multiline"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{ width: '250px' }}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </div>
    );
}