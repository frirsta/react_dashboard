import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "./Avatar";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const [displayUsername, setDisplayUsername] = useState("");
  const [displayMenu, setDisplayMenu] = useState(false);
  const location = useLocation();
  const usenavigate = useNavigate();

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/login" || location.pathname === "/register") {
      setDisplayMenu(false);
    } else {
      setDisplayMenu(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        usenavigate("/login");
      } else {
        setDisplayUsername(username);
      }
    }
  }, [location, usenavigate]);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {displayMenu && (
        <Box sx={{ display: "flex" }}>
          <AppBar position="fixed" open={open}>
            <Toolbar className={styles.TopNavBarContainer}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <ul className={styles.NavbarLinks}>
                <NavLink className={styles.NavLink} to={"/login"}>
                  <LogoutIcon />
                  Sign out
                </NavLink>
              </ul>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader className={styles.NavbarLogo}>
            Teztable
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
              
            </DrawerHeader>
            <Divider />
            <div className={styles.ListContainer}>
              <List>
                <Link className={styles.NavLink} to={"/tester"}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      className={styles.ListItemButton}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <BadgeIcon className={styles.NavbarIcon} />
                      </ListItemIcon>
                      <ListItemText
                        className={styles.NavbarText}
                        primary={"Testers"}
                        sx={{ opacity: open ? 1 : 0 }}
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link className={styles.NavLink} to={"/testlist"}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      className={styles.ListItemButton}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <AssignmentIcon className={styles.NavbarIcon} />
                      </ListItemIcon>
                      <ListItemText
                        className={styles.NavbarText}
                        primary={"Testlist"}
                        sx={{ opacity: open ? 1 : 0 }}
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link className={styles.NavLink} to={"/createtest"}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      className={styles.ListItemButton}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <NoteAddIcon className={styles.NavbarIcon} />
                      </ListItemIcon>
                      <ListItemText
                        className={styles.NavbarText}
                        primary={"Add test"}
                        sx={{ opacity: open ? 1 : 0 }}
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>

              <ListItem
                className={styles.NavbarAccount}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  className={styles.ListItemButton}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText
                    className={styles.NavbarText}
                    primary={displayUsername}
                    sx={{ opacity: open ? 1 : 0 }}
                  >
                    {displayUsername}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </div>
          </Drawer>
        </Box>
      )}
    </div>
  );
}
