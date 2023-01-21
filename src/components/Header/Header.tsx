import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//assets
import Logo from '../../assets/icons/logo.svg'
import './style.css'

const pages = [
    {
        name: 'All Posts',
        url: '/'
    },
    {
        name: 'Add a Post',
        url: '/add'
    },
    {
        name: 'Edit a Post',
        url: '/edit/1'
    }];

export const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        <img src={Logo} alt="logo"/>
                    </Typography>
                    <Box>
                        {
                            pages.map((page) => (
                                <Button
                                    className="header-btn"
                                    key={page.url}
                                    onClick={() => navigate(`${page.url}`)}>
                                    {page.name}
                                </Button>
                            ))
                        }
                    </Box>
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}