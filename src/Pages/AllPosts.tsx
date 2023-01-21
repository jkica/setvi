import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { getAllUrl } from "../constants/enpoints";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import './style.css'

// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from "@mui/material";

export const AllPosts = () => {
    const {posts, initPosts} = useContext(GlobalContext);
    const [busy, setBusy] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        busy && axios.get(getAllUrl())
            .then(res => {
                initPosts(res.data)
                setBusy(false);
            })
            .catch(err => {
                // TODO@jkcia: catch error
                
                setBusy(false);
            })
    }, [])

    return (
        <div className="table-wrapper">
            {
                !busy ?
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell align="left"><strong>Title</strong></TableCell>
                                    <TableCell align="left"><strong>Description</strong></TableCell>
                                    <TableCell align="left"><strong>User ID</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    posts.map((post) => (
                                        <TableRow
                                            key={post.id}
                                            onClick={() => navigate(`/posts/${post.id}`)}
                                            className="table-row">
                                            <TableCell component="th" scope="post">{post.id}</TableCell>
                                            <TableCell align="left">{post.title}</TableCell>
                                            <TableCell align="left">{post.body}</TableCell>
                                            <TableCell align="left">{post.userId}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <CircularProgress className="loader" />
            }
        </div>
    )
}