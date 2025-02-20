import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "../styles/Navbar.module.css";
import { Link, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import LoginIcon from "@mui/icons-material/Login";

export default function OfflineNavbar() {
    const [displayMenu, setDisplayMenu] = useState(true);
    const location = useLocation();
  
    useEffect(() => {
      console.log(location);
      if (location.pathname === "/login" || location.pathname === "/register") {
        setDisplayMenu(true);
      } else {
        setDisplayMenu(false);
      }
    }, [location]);
  return (
    <div>
        {displayMenu &&
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teztable
          </Typography>
          <ul className={styles.NavbarLinks}>
          <Link className={styles.NavLink} to={'/testerlogin'} color="inherit"><LoginIcon/> Log in</Link>
          <Link className={styles.NavLink} to={'/register'} color="inherit">Register</Link>
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
}</div>
  );
}