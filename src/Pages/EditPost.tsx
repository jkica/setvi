import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Post } from '../types/PostInterface'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { removeUrl, getUrl, editUrl } from "../constants/enpoints";

// components
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {IconButton, TextField, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

export const EditPost = () => {
    const navigate = useNavigate();
    const { editPost, removePost } = useContext(GlobalContext);
    const { id } = useParams();
    const [inputValuesChanged, setInputValuesChanged] = useState(false);
    const [post, setPost] = useState<Post>()
    const [error, setError] = useState(false);
    
    const getPost = () => {
        setInputValuesChanged(false);

        id && axios.get(getUrl(+id))
            .then(res => {
                setPost(res.data)
            })
            .catch(err => {
                // TODO@jkcia: catch error

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
            })
            .catch(err => {
                // TODO@jkcia: catch error

            })
    }
    
    const deletePost = () => {
        id && axios.delete(removeUrl(+id))
            .then(res => {
                removePost(+id);
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
                            error={error}
                            label="Title"
                            value={post.title}
                            helperText={error ? 'Error msg' : ''}
                        />
                        <TextField
                            onChange={e => handleFieldChange('body', e.target.value)}
                            error={error}
                            label="Description"
                            value={post.body}
                            helperText={error ? 'Error msg' : ''}
                        />
                        {/* TODO@jkica: should we be able to change the userId? */}
                        <TextField
                            onChange={e => handleFieldChange('userId', e.target.value)}
                            error={error}
                            label="User ID"
                            value={post.userId}
                            helperText={error ? 'Error msg' : ''}
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
        </div>
    )
}