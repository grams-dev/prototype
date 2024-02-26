import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/Wallet';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';

const menuLists = [
    [
        {
            title: 'Home',
            icon: <HomeIcon />,
            link: '/'
        },
        {
            title: 'Wallet',
            icon: <WalletIcon />,
            link: '/wallet'
        },
        {
            title: 'Chat',
            icon: <ChatIcon />,
            link: '/chat'
        },
        {
            title: 'Marketplace',
            icon: <ShoppingCartIcon />,
            link: '/marketplace'
        },
        {
            title: 'Groups',
            icon: <GroupIcon />,
            link: '/groups'
        }
    ],
    [
        {
            title: 'Settings',
            icon: <SettingsIcon />,
            link: '/settings'
        },
        {
            title: 'Profile',
            icon: <AccountCircleIcon />,
            link: '/profile'
        },
        {
            title: 'About',
            icon: <InfoIcon />,
            link: '/about'
        }
    ]
]

export const GramsDrawer = () => {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            {menuLists.map((menuList, index) => (
                <>
                <List key={index}>
                    {menuList.map((menu) => (
                        <ListItem key={menu.title} disablePadding>
                            <ListItemButton href={menu.link}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                </>
            ))}
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
