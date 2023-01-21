import React, { useState, useContext } from 'react';
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { createUrl } from "../constants/enpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const CreatePost = () => {
    const navigate = useNavigate();
    const { createPost } = useContext(GlobalContext);
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: 1
    })
    const [error, setError] = useState(false);

    const handleFieldChange = (field: string, value: string) => {
        setInputValuesChanged(true)
        setFormData(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        })
    }

    const submit = () => {
        console.log(formData)
        axios.post(
            createUrl(),
            formData,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => {
                createPost(res.data);
                navigate('/')
            })
            .catch(err => {
                // TODO@jkcia: catch error

            })
    }

    const validate = (input: any) => {
        // validate here

        return true;
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Paper className="edit-modal" elevation={3}>
                    <div className="edit-modal-header">
                        <div className="edit-modal-header-title">Create Post</div>
                    </div>
                    <TextField
                        onChange={e => handleFieldChange('title', e.target.value)}
                        error={error}
                        label="Title"
                        helperText={error ? 'Error msg' : ''}
                    />
                    <TextField
                        onChange={e => handleFieldChange('body', e.target.value)}
                        error={error}
                        label="Description"
                        helperText={error ? 'Error msg' : ''}
                    />
                    <Button
                        type="submit"
                        onClick={submit}
                        disabled={!inputValuesChanged}
                        className="edit-modal-btn"
                        variant="contained">
                        Apply
                    </Button>
                    <Button
                        href="/"
                        className="edit-modal-btn"
                        variant="outlined">
                        Cancel
                    </Button>
                </Paper>
            </Container>
        </div>
    )
}