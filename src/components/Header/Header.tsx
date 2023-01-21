import * as React from 'react';
import { useLocation } from "react-router-dom";

// components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//assets
import Logo from '../../assets/icons/logo.svg';
import './style.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export const Header = () => {
    const location = useLocation();
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar className="header-wrapper" disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        <img src={Logo} alt="logo"/>
                    </Typography>
                    {
                        location.pathname !== '/create' &&
                        <Button
                            href="/create"
                            className="header-create-btn"
                            color="success"
                            size="large"
                            endIcon={<AddCircleOutlineRoundedIcon />}
                            variant="contained">
                            Create Post
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}