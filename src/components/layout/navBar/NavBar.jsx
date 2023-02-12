import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../public/img/logo.png';
import './styles.css';

const pages = [
    { desc: 'Inicio', link: 'inicio' },
    { desc: 'Equipos', link: 'equipos' },
    { desc: 'Info', link: 'info' },
];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userLogged, setUserLogged] = useState(null);
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('entre al use effect');
        const user = localStorage.getItem('user');
        console.log(user);
        if (user) {
            const userAbbr = JSON.parse(user).substring(0, 2).toUpperCase();
            setUserLogged(userAbbr);
        }
    }, [location]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (event) => {
        if (event.target.innerText === 'Logout') {
            handleLogout();
        }
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserLogged(null);
        history('/login');
        setAnchorElUser(null);
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters className='toolbarMenu'>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img width='150px' src={logo} alt='' />
                    </Box>
                    <Box
                        sx={{
                            // flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ desc, link }) => (
                                <MenuItem
                                    key={link}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign='center'>
                                        <Link
                                            to={`/${link}`}
                                            className='toolbarMenu_item_colored'
                                        >
                                            {desc}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <img width='100px' src={logo} alt='' />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map(({ desc, link }) => (
                            <Button
                                key={link}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link
                                    to={`/${link}`}
                                    className='toolbarMenu_item'
                                >
                                    {desc}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar>{userLogged ? userLogged : ''}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!userLogged ? (
                                <MenuItem
                                    key='login'
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign='center'>
                                        <Link
                                            to={`/login`}
                                            className='toolbarMenu_item_colored'
                                        >
                                            Login
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ) : (
                                settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign='center'>
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
