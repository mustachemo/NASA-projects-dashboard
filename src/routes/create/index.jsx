import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

import "./index.css";

import { db } from "src/setup/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

import { auth } from "src/setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Create() {
  const [warning, setWarning] = useState("");
  const [tags, setTags] = useState(["test"]);
  const [user] = useAuthState(auth);
  const [projectObj, setProjectObj] = useState({
    title: "",
    description: "",
    tags: [],
    associated_user: "",
    startDate: "",
    endDate: "",
    imageURL: "",
  });
  useEffect(() => {
    if (user == undefined) return;
    setProjectObj((obj) => {
      return {
        ...obj,
        associated_user: user.displayName,
      };
    });
  }, [user]);

  useEffect(() => {
    const getTags = async () => {
      const docRef = doc(db, "algoparams", "params");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTags(docSnap.data().tags);
      } else {
        console.log(`tags not found`);
      }
    };
    getTags();
  }, []);

  async function handleSubmit() {
    if (projectObj.title.length < 6) {
      setWarning("Project title too short.");
      return;
    }
    if (projectObj.description.length < 6) {
      setWarning("Project desc too short.");
      return;
    }
    if (projectObj.description.length < 6) {
      setWarning("Project title too short.");
      return;
    }
    if (projectObj.tags.length < 1) {
      setWarning("Project must have atleast one tag");
      return;
    }

    const docRef = await addDoc(collection(db, "projects"), projectObj);
    redirect(`/project/${docRef.id}`);
  }

  return (
    <Container maxWidth="sm" className="form-container">
      <Typography variant="h3" gutterBottom>
        Edit Project
      </Typography>
      <TextField
        placeholder={projectObj.title}
        fullWidth
        onChange={(event) =>
          setProjectObj((obj) => {
            return {
              ...obj,
              title: event.target.value,
            };
          })
        }
        label="Title"
        variant="outlined"
      />
      <TextField
        placeholder={projectObj.imageURL}
        fullWidth
        onChange={(event) =>
          setProjectObj((obj) => {
            return {
              ...obj,
              imageURL: event.target.value,
            };
          })
        }
        label="Image URL"
        variant="outlined"
      />
      <TextField
        label="Project Description"
        multiline
        fullWidth
        rows={10}
        placeholder="Lovely project description. :)"
        onChange={(event) =>
          setProjectObj((obj) => {
            return {
              ...obj,
              description: event.target.value,
            };
          })
        }
      />
      <Autocomplete
        multiple
        id="tags-filled"
        options={tags.map((option) => option)}
        defaultValue={[]}
        freeSolo
        onChange={(event, value) =>
          setProjectObj((obj) => {
            return {
              ...obj,
              tags: value.map((tag) => tag.toLowerCase()),
            };
          })
        }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Project Tags"
            placeholder="Enter"
          />
        )}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        style={{ marginTop: "8px" }}>
        Save
      </Button>
      {warning ? (
        <Alert severity="info">
          <AlertTitle>Could Not Post</AlertTitle>
          {warning}
        </Alert>
      ) : (
        <></>
      )}
    </Container>
  );
}
