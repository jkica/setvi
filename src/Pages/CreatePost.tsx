import React, { useState, useContext } from 'react';
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { createUrl } from "../constants/enpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const CreatePost = () => {
    const navigate = useNavigate();
    const { createPost } = useContext(GlobalContext);
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: 1
    });
    // TODO@jkica: maybe move toaster to context?
    const [toaster, setToaster] = useState({
        visible: false,
        success: false,
        type: '',
        message: ''
    });

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
                setToaster({
                    visible: true,
                    success: true,
                    type: 'create',
                    message: 'Post Created'
                });
            })
            .catch(err => {
                setToaster({
                    visible: true,
                    success: false,
                    type: 'create',
                    message: 'Error Creating Post'
                });
            })
    }

    const onToasterClose = () => {
        setToaster(prevState => {
            return {
                ...prevState,
                visible: false
            }
        });

        toaster.success &&
        toaster.type === 'create' &&
        navigate('/');
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
                        label="Title" />
                    <TextField
                        onChange={e => handleFieldChange('body', e.target.value)}
                        label="Description" />
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
            <Snackbar
                open={toaster.visible}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={onToasterClose}>
                <Alert
                    variant="filled"
                    onClose={onToasterClose}
                    severity={toaster.success ? 'success' : 'error'}>
                    {toaster.message}
                </Alert>
            </Snackbar>
        </div>
    )
}