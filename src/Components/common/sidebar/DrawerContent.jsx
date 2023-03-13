import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Parse from 'parse/dist/parse.min.js';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, Divider, styled } from '@mui/material';
import useFetch from '../../../Pages/useFetch';
const sidebarNavItems = [
    //{
    //    display: 'Anasayfa',
    //    icon: <i className='bx bx-home'></i>,
    //    to: '/',
    //    section: '',
    //    accessLevel: null
    //},
    // {
    //     display: 'Takvim',
    //     icon: <i className='bx bx-calendar'></i>,
    //     to: '/dashboard/calendar',
    //     section: 'calendar',
    //     accessLevel: "shiftManipulation"
    // },
    {
        display: 'Profil',
        icon: <i className='bx bx-user'></i>,
        to: '/dashboard/userProfile',
        section: 'user',
        accessLevel: null
    },
    {
        display: 'Menüyü Düzenle',
        icon: <i className='bx bx-receipt'></i>,
        to: '/dashboard/menuEditer',
        section: 'menuEditer',
        accessLevel: "menuItemEdit"
    },
    {
        display: 'Ayarlar',
        icon: <i className={'bx bx-receipt'}></i>,
        to: '/dashboard/settings',
        section: 'order',
        accessLevel: null
    },
    {
        display: 'Şirket Çalışanları',
        icon: <i className={'bx bx-user'}></i>,
        to: '/dashboard/users',
        section: 'users',
        accessLevel: "userManipulation"
    },
    {
        display: 'Menü Düzenleme Deneme',
        icon: <i className={'bx bx-user'}></i>,
        to: '/dashboard/menuEditDeneme',
        section: 'users',
        accessLevel: null
    },
]

const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.primary.main,
    // ':hover' : {
    //     color: theme.palette.primary.ligh
    // }
}))

const CustomListItem = ({ item, handleClick}) => {
    return (
        <ListItem disablePadding component={StyledLink} to={item.to} key={item.display+item.to} onClick={handleClick}>
            <ListItemButton sx={{ paddingLeft: 3 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.display}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
}

export default function ({appBarHeight, data, handleClick}) {
    // const { data, loading, error } = useFetch("http://localhost:3001/role/deneme");
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);
    const SIDEBAR_WIDTH = "225px";
    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    if (!data) {
        return (
            <div>
            </div>
        );
    }
    return (
        // <Drawer variant="permanent" sx={{
        //     width: SIDEBAR_WIDTH,
        //     // flexShrink: 0,
        //     [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
        // }}>
        //     <DrawerContent data={data} height={props.appBarHeight}/>
        // </Drawer>
        <div>
            <Toolbar sx={{ minHeight: appBarHeight, height: appBarHeight }} />
            <List>
                {sidebarNavItems.map((item, index) => (
                    !item.accessLevel ? <CustomListItem item={item} handleClick={handleClick}/>
                        : ((data[item?.accessLevel] ? <CustomListItem item={item} handleClick={handleClick}/>
                            : ("")))
                ))}
            </List>
        </div>
    );
};