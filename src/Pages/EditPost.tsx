import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Post } from '../types/PostInterface'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { removeUrl, getUrl, editUrl } from "../constants/enpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, IconButton, Snackbar, TextField, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

export const EditPost = () => {
    const navigate = useNavigate();
    const { editPost, removePost } = useContext(GlobalContext);
    const { id } = useParams();
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [post, setPost] = useState<Post>();
    // TODO@jkica: maybe move toaster to context?
    const [toaster, setToaster] = useState({
        visible: false,
        success: false,
        type: '',
        message: ''
    });
    
    const getPost = () => {
        setInputValuesChanged(false);

        id && axios.get(getUrl(+id))
            .then(res => {
                setPost(res.data)
            })
            .catch(err => {
                setToaster({
                    visible: true,
                    success: false,
                    type: 'get',
                    message: 'Error fetching the post'
                });
            })
    }

    const handleFieldChange = (field: string, value: string) => {
        setInputValuesChanged(true)
        post && setPost({ ...post, [field]: value })
    }
    
    const submit = () => {
        id && post && axios.put(
            editUrl(+id),
            post,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => {
                editPost(res.data);
                setInputValuesChanged(false);
                setToaster({
                    visible: true,
                    success: true,
                    type: 'update',
                    message: 'Post Updated'
                });
            })
            .catch(err => {
                setToaster({
                    visible: true,
                    success: false,
                    type: 'update',
                    message: 'Error updating the post'
                });
            })
    }
    
    const deletePost = () => {
        id && axios.delete(removeUrl(+id))
            .then(res => {
                removePost(+id);
                setToaster({
                    visible: true,
                    success: true,
                    type: 'delete',
                    message: 'Post Deleted'
                });
            })
            .catch(err => {
                setToaster({
                    visible: true,
                    success: false,
                    type: 'delete',
                    message: 'Error Deleting Post'
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
        toaster.type === 'delete' &&
        navigate('/');
    }
    
    useEffect(() => getPost(), [id])

    return (
        <div>
            <Container maxWidth="sm">
                {
                    post &&
                    <Paper className="edit-modal" elevation={3}>
                        <div className="edit-modal-header">
                            <div className="edit-modal-header-title">Update Post</div>
                            <Tooltip title="Delete Post">
                                <IconButton onClick={deletePost} aria-label="delete" size="large" color="error">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <TextField
                            onChange={e => handleFieldChange('title', e.target.value)}
                            label="Title"
                            value={post.title}
                        />
                        <TextField
                            onChange={e => handleFieldChange('body', e.target.value)}
                            label="Description"
                            value={post.body}
                        />
                        {/* TODO@jkica: should we enable changing the userId? */}
                        <TextField
                            disabled
                            onChange={e => handleFieldChange('userId', e.target.value)}
                            label="User ID"
                            value={post.userId}
                        />
                        <Button
                            onClick={submit}
                            disabled={!inputValuesChanged}
                            className="edit-modal-btn"
                            variant="contained">
                            Apply
                        </Button>
                        <Button
                            onClick={getPost}
                            disabled={!inputValuesChanged}
                            className="edit-modal-btn"
                            variant="outlined">
                            Cancel
                        </Button>
                    </Paper>
                }
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